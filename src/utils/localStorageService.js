const LocalStorageService = (() => {
  let _service;

  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }

  function _setToken(tokenObj) {
    localStorage.setItem('authToken', tokenObj.authToken);
    localStorage.setItem('refreshToken', tokenObj.refreshToken);
  }

  function _getAuthToken() {
    return localStorage.getItem('authToken');
  }

  function _getRefreshToken() {
    return localStorage.getItem('refreshToken');
  }

  function _clearToken() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('refreshToken');
  }

  return {
    getService: _getService,
    setToken: _setToken,
    getAuthToken: _getAuthToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();

export default LocalStorageService;
