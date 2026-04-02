/**
 * Base error for all LLM-related failures.
 */
export class LLMError extends Error {
  public readonly code: string;

  constructor(message: string, code: string) {
    super(message);
    this.name = 'LLMError';
    this.code = code;
  }
}

/**
 * Authentication failure — invalid or missing API key (401).
 */
export class LLMAuthError extends LLMError {
  constructor(message = 'API 密钥无效或已过期，请检查后重试') {
    super(message, 'AUTH_ERROR');
    this.name = 'LLMAuthError';
  }
}

/**
 * Rate limit exceeded (429).
 */
export class LLMRateLimitError extends LLMError {
  constructor(message = '请求太频繁了，稍等一会儿再试试') {
    super(message, 'RATE_LIMIT');
    this.name = 'LLMRateLimitError';
  }
}

/**
 * Response validation failure — unexpected format or empty content.
 */
export class LLMValidationError extends LLMError {
  constructor(message = '生成的结果有问题，换个方式试试') {
    super(message, 'VALIDATION_ERROR');
    this.name = 'LLMValidationError';
  }
}
