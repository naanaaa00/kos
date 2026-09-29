import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
const MidtransNotificationController = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MidtransNotificationController.url(options),
    method: 'post',
})

MidtransNotificationController.definition = {
    methods: ["post"],
    url: '/api/webhooks/midtrans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
MidtransNotificationController.url = (options?: RouteQueryOptions) => {
    return MidtransNotificationController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
MidtransNotificationController.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: MidtransNotificationController.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
    const MidtransNotificationControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: MidtransNotificationController.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
        MidtransNotificationControllerForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: MidtransNotificationController.url(options),
            method: 'post',
        })
    
    MidtransNotificationController.form = MidtransNotificationControllerForm
export default MidtransNotificationController