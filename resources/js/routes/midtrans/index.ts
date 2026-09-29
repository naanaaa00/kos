import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../wayfinder'
/**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
export const notification = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notification.url(options),
    method: 'post',
})

notification.definition = {
    methods: ["post"],
    url: '/api/webhooks/midtrans',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
notification.url = (options?: RouteQueryOptions) => {
    return notification.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
notification.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: notification.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
    const notificationForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: notification.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\MidtransNotificationController::__invoke
 * @see app/Http/Controllers/MidtransNotificationController.php:17
 * @route '/api/webhooks/midtrans'
 */
        notificationForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: notification.url(options),
            method: 'post',
        })
    
    notification.form = notificationForm
const midtrans = {
    notification: Object.assign(notification, notification),
}

export default midtrans