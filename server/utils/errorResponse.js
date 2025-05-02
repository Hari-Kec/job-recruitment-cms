class ErrorResponse extends Error {
    /**
     * Create custom ErrorResponse
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code
     */
    constructor(message, statusCode) {
      super(message);
      this.statusCode = statusCode;
      
      // Capture stack trace (excluding constructor call from it)
      Error.captureStackTrace(this, this.constructor);
      
      // Set the prototype explicitly (needed for instanceof checks)
      Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
  
    /**
     * Convert error to JSON format
     * @returns {Object} - JSON representation of the error
     */
    toJSON() {
      return {
        message: this.message,
        statusCode: this.statusCode,
        stack: process.env.NODE_ENV === 'development' ? this.stack : undefined
      };
    }
  
    /**
     * Create a bad request error (400)
     * @param {string} message - Error message
     * @returns {ErrorResponse}
     */
    static badRequest(message = 'Bad Request') {
      return new ErrorResponse(message, 400);
    }
  
    /**
     * Create an unauthorized error (401)
     * @param {string} message - Error message
     * @returns {ErrorResponse}
     */
    static unauthorized(message = 'Unauthorized') {
      return new ErrorResponse(message, 401);
    }
  
    /**
     * Create a forbidden error (403)
     * @param {string} message - Error message
     * @returns {ErrorResponse}
     */
    static forbidden(message = 'Forbidden') {
      return new ErrorResponse(message, 403);
    }
  
    /**
     * Create a not found error (404)
     * @param {string} message - Error message
     * @returns {ErrorResponse}
     */
    static notFound(message = 'Not Found') {
      return new ErrorResponse(message, 404);
    }
  
    /**
     * Create a conflict error (409)
     * @param {string} message - Error message
     * @returns {ErrorResponse}
     */
    static conflict(message = 'Conflict') {
      return new ErrorResponse(message, 409);
    }
  
    /**
     * Create an internal server error (500)
     * @param {string} message - Error message
     * @returns {ErrorResponse}
     */
    static internal(message = 'Internal Server Error') {
      return new ErrorResponse(message, 500);
    }
  }
  
  export default ErrorResponse;