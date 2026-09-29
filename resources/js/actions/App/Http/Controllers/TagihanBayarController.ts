import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
const TagihanBayarController = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TagihanBayarController.url(args, options),
    method: 'get',
})

TagihanBayarController.definition = {
    methods: ["get","head"],
    url: '/bayar/{tagihan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
TagihanBayarController.url = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return TagihanBayarController.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
TagihanBayarController.get = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TagihanBayarController.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
TagihanBayarController.head = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: TagihanBayarController.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
    const TagihanBayarControllerForm = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: TagihanBayarController.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
        TagihanBayarControllerForm.get = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TagihanBayarController.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
        TagihanBayarControllerForm.head = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TagihanBayarController.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    TagihanBayarController.form = TagihanBayarControllerForm
export default TagihanBayarController