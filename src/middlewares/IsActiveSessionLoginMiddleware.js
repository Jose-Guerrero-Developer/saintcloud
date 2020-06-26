/**
 * En: Validate if there is an active session when you are in the login path
 * Es: Validar si existe una sesión activa cuando este en la ruta de inicio de sesión
 * @param { to, next, Vue, isActiveToken }
 * @return next
 */
export const IsActiveSessionLoginMiddleware = ({ to, next, Vue, isActiveToken }) => {
  const {
    $http,
    $store, $httpStatus, } = Vue
  if (to.name === 'login' && isActiveToken) {
    $http.get('auth/is-valid-token')
      .then(({ status }) => {
        if (status === $httpStatus.OK) {
          return next({
            name: 'dashboard'
          })
        }
      })
      .catch(() => {
        $store.dispatch('auth/sign-out', Vue)
        return next({
          name: 'login'
        })
      })
  }
  return next()
}
