import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
const TagihanWaReminderController = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: TagihanWaReminderController.url(args, options),
    method: 'post',
})

TagihanWaReminderController.definition = {
    methods: ["post"],
    url: '/tagihan/{tagihan}/wa-reminder',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
TagihanWaReminderController.url = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return TagihanWaReminderController.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
TagihanWaReminderController.post = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: TagihanWaReminderController.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
    const TagihanWaReminderControllerForm = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: TagihanWaReminderController.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TagihanWaReminderController::__invoke
 * @see app/Http/Controllers/TagihanWaReminderController.php:16
 * @route '/tagihan/{tagihan}/wa-reminder'
 */
        TagihanWaReminderControllerForm.post = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: TagihanWaReminderController.url(args, options),
            method: 'post',
        })
    
    TagihanWaReminderController.form = TagihanWaReminderControllerForm
export default TagihanWaReminderController