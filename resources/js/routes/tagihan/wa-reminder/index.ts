import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
export const store = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tagihan/{tagihan}/wa-reminder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
store.url = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { tagihan: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { tagihan: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    tagihan: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                }

    return store.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
store.post = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
    const storeForm = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
        storeForm.post = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
const waReminder = {
    store: Object.assign(store, store),
}

export default waReminder