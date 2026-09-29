import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
const WelcomeController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: WelcomeController.url(options),
    method: 'get',
})

WelcomeController.definition = {
    methods: ["get","head"],
    url: '/',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
WelcomeController.url = (options?: RouteQueryOptions) => {
    return WelcomeController.definition.url + queryParams(options)
}

/**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
WelcomeController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: WelcomeController.url(options),
    method: 'get',
})
/**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
WelcomeController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: WelcomeController.url(options),
    method: 'head',
})

    /**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
    const WelcomeControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: WelcomeController.url(options),
        method: 'get',
    })

            /**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
        WelcomeControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: WelcomeController.url(options),
            method: 'get',
        })
            /**
* @see \App\WelcomeController::__invoke
 * @see app/WelcomeController.php:10
 * @route '/'
 */
        WelcomeControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: WelcomeController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    WelcomeController.form = WelcomeControllerForm
export default WelcomeController