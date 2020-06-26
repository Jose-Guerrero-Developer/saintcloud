/**
 * En: Auto-loads all available middleware on the current route
 * Es: Auto carga todos los middleware disponible en la ruta actual
 * @param  {*} context 
 * @param  {*} middleware 
 * @param  {*} index
 * @return {*}
 */
export const  MiddlewareLoader = (context, middleware, index) => {
  const nextMiddleware = middleware[index]
  if (!nextMiddleware) {
    return context.next
  }
  return () => {
    const nextPipeline = MiddlewareLoader(
      context, middleware, index + 1
    )
    nextMiddleware({ ...context, next: nextPipeline })
  }
}
