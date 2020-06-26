/**
 * En: Middleware rules for validating login credentials
 * Es: Reglas de middleware para validar credenciales de acceso
 * @param { to, next, Vue, isActiveToken, hasExpiredToken }
 * @return next
 */
export const AuthMiddleware = ({ to, next, Vue, isActiveToken, hasExpiredToken }) => {
  const {
    $http, $i18n, $store,
    $buefy, $httpStatus   } = Vue
  /* En: Validate if there is an active session and if you have the access permissions
     Es: Validar si existe una sesión activa y si cuenta con los permisos de acceso      */
  if (to.name !== 'login' && isActiveToken) {
    $http.get('auth/is-valid-token')
      .catch(() => {
        $store.dispatch('auth/sign-out', Vue)
        return next({
          name: 'login'
        })
      })
  }
  /* En: Validate if there is no session with login credentials
     Es: Validar si no existe una sesión con credenciales de acceso */
  if (to.name !== 'login' && !isActiveToken) {
    $store.dispatch('auth/sign-out', Vue)
    return next({
      name: 'login'
    })
  }
  /* En: Validate if the session token expired
     Es: Validar si el token de la sesión expiro */
  if (isActiveToken && hasExpiredToken) {
    $http.post('auth/refresh')
      .then(authorization => { 
        const { 
          status, data: credentials } = authorization
        if (status === $httpStatus.OK && !$store.dispatch('auth/sign-in', { Vue, credentials })) {
          $store.dispatch('auth/sign-out', Vue)
          $buefy.notification.open({ type: 'is-danger', duration:   3000, 'has-icon': true,
            message:    `
              <h5
                class = "is-size-6 has-text-weight-bold"
              >
                ${ $i18n.t('authentication') }
              </h5>
              <p class = "is-size-6">${ $i18n.t('impossible_to_refresh_the_session_token') }</p>
            `
          })
          return next({
            name: 'login'
          })
        }
      })
  }
  return next()
}
