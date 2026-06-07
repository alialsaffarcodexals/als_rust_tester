import { useState, useCallback } from 'react';
import type { ExecutionResult, TestResult, TestCase } from '../types';

const PLAYGROUND_URL = '/playground/execute';

interface PlaygroundRequest {
  channel: 'stable' | 'beta' | 'nightly';
  edition: '2015' | '2018' | '2021';
  mode: 'debug' | 'release';
  crateType: 'bin' | 'lib';
  code: string;
  tests: boolean;
}

interface PlaygroundResponse {
  success: boolean;
  stdout: string;
  stderr: string;
}

async function callPlayground(code: string): Promise<ExecutionResult> {
  const body: PlaygroundRequest = {
    channel: 'stable',
    edition: '2021',
    mode: 'debug',
    crateType: 'bin',
    code,
    tests: false,
  };

  try {
    const response = await fetch(PLAYGROUND_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`Playground API returned ${response.status}`);
    }

    const data: PlaygroundResponse = await response.json();
    const hasCompileError =
      data.stderr.includes('error[') ||
      data.stderr.includes('error:') ||
      (!data.success && data.stderr.trim().length > 0);

    return {
      stdout: data.stdout,
      stderr: data.stderr,
      success: data.success,
      compilationError: hasCompileError,
    };
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return {
      stdout: '',
      stderr: `Failed to reach Rust Playground: ${message}\n\nMake sure the dev server is running (npm run dev) — the proxy routes /playground to play.rust-lang.org`,
      success: false,
      compilationError: false,
    };
  }
}

export function useRustExecution() {
  const [isRunning, setIsRunning] = useState(false);
  const [isTesting, setIsTesting] = useState(false);

  const runCode = useCallback(async (code: string): Promise<ExecutionResult> => {
    setIsRunning(true);
    try {
      return await callPlayground(code);
    } finally {
      setIsRunning(false);
    }
  }, []);

  const runTests = useCallback(
    async (userCode: string, testCases: TestCase[]): Promise<TestResult[]> => {
      setIsTesting(true);
      const results: TestResult[] = [];

      try {
        for (const tc of testCases) {
          // Replace placeholder with user's actual code
          const fullCode = tc.code.replace('// USER_CODE_HERE', userCode);
          const result = await callPlayground(fullCode);

          const actualOutput = result.stdout.trim();
          const expectedOutput = tc.expectedOutput.trim();
          const passed = result.success && actualOutput === expectedOutput;

          results.push({
            testId: tc.id,
            passed,
            description: tc.description,
            output: actualOutput,
            expected: expectedOutput,
            error: !result.success ? result.stderr : undefined,
          });
        }
      } finally {
        setIsTesting(false);
      }

      return results;
    },
    []
  );

  return { runCode, runTests, isRunning, isTesting };
}
