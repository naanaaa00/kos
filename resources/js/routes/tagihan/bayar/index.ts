import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../wayfinder'
/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
export const selesai = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selesai.url(options),
    method: 'get',
})

selesai.definition = {
    methods: ["get","head"],
    url: '/bayar/selesai',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
selesai.url = (options?: RouteQueryOptions) => {
    return selesai.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
selesai.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: selesai.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
selesai.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: selesai.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
    const selesaiForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: selesai.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
        selesaiForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: selesai.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanBayarSelesaiController::__invoke
 * @see app/Http/Controllers/TagihanBayarSelesaiController.php:18
 * @route '/bayar/selesai'
 */
        selesaiForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: selesai.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    selesai.form = selesaiForm
/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
export const show = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})

show.definition = {
    methods: ["get","head"],
    url: '/bayar/{tagihan}',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
show.url = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return show.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
show.get = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: show.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
show.head = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: show.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
    const showForm = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: show.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
        showForm.get = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanBayarController::__invoke
 * @see app/Http/Controllers/TagihanBayarController.php:16
 * @route '/bayar/{tagihan}'
 */
        showForm.head = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: show.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    show.form = showForm
/**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
export const lunas = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lunas.url(args, options),
    method: 'get',
})

lunas.definition = {
    methods: ["get","head"],
    url: '/bayar/{tagihan}/lunas',
} satisfies RouteDefinition<["get","head"]>

/**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
lunas.url = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return lunas.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
lunas.get = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: lunas.url(args, options),
    method: 'get',
})
/**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
lunas.head = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: lunas.url(args, options),
    method: 'head',
})

    /**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
    const lunasForm = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: lunas.url(args, options),
        method: 'get',
    })

            /**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
        lunasForm.get = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lunas.url(args, options),
            method: 'get',
        })
            /**
 * @see routes/web.php:27
 * @route '/bayar/{tagihan}/lunas'
 */
        lunasForm.head = (args: { tagihan: number | { id: number } } | [tagihan: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: lunas.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    lunas.form = lunasForm
const bayar = {
    selesai: Object.assign(selesai, selesai),
show: Object.assign(show, show),
lunas: Object.assign(lunas, lunas),
}

export default bayar