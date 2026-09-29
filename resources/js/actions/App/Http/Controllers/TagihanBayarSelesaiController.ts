import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
const TagihanBayarSelesaiController = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TagihanBayarSelesaiController.url(options),
    method: 'get',
})

TagihanBayarSelesaiController.definition = {
    methods: ["get","head"],
    url: '/bayar/selesai',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
TagihanBayarSelesaiController.url = (options?: RouteQueryOptions) => {
    return TagihanBayarSelesaiController.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
TagihanBayarSelesaiController.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: TagihanBayarSelesaiController.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
TagihanBayarSelesaiController.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: TagihanBayarSelesaiController.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
    const TagihanBayarSelesaiControllerForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: TagihanBayarSelesaiController.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
        TagihanBayarSelesaiControllerForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TagihanBayarSelesaiController.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
        TagihanBayarSelesaiControllerForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: TagihanBayarSelesaiController.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    TagihanBayarSelesaiController.form = TagihanBayarSelesaiControllerForm
export default TagihanBayarSelesaiController