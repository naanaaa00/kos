import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
export const index = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/tagihan/{tagihan}/pembayaran',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
index.url = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return index.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
index.get = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
index.head = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
    const indexForm = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
        indexForm.get = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PembayaranController::index
 * @see app/Http/Controllers/PembayaranController.php:16
 * @route '/tagihan/{tagihan}/pembayaran'
 */
        indexForm.head = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
export const create = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/tagihan/{tagihan}/pembayaran/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
create.url = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions) => {
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

    return create.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
create.get = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
create.head = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
    const createForm = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
        createForm.get = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PembayaranController::create
 * @see app/Http/Controllers/PembayaranController.php:29
 * @route '/tagihan/{tagihan}/pembayaran/create'
 */
        createForm.head = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\PembayaranController::store
 * @see app/Http/Controllers/PembayaranController.php:36
 * @route '/tagihan/{tagihan}/pembayaran'
 */
export const store = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/tagihan/{tagihan}/pembayaran',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\PembayaranController::store
 * @see app/Http/Controllers/PembayaranController.php:36
 * @route '/tagihan/{tagihan}/pembayaran'
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
* @see \App\Http\Controllers\PembayaranController::store
 * @see app/Http/Controllers/PembayaranController.php:36
 * @route '/tagihan/{tagihan}/pembayaran'
 */
store.post = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\PembayaranController::store
 * @see app/Http/Controllers/PembayaranController.php:36
 * @route '/tagihan/{tagihan}/pembayaran'
 */
    const storeForm = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PembayaranController::store
 * @see app/Http/Controllers/PembayaranController.php:36
 * @route '/tagihan/{tagihan}/pembayaran'
 */
        storeForm.post = (args: { tagihan: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number } ] | string | number | { id: string | number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
export const edit = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
edit.url = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tagihan: args[0],
                    pembayaran: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                                pembayaran: typeof args.pembayaran === 'object'
                ? args.pembayaran.id
                : args.pembayaran,
                }

    return edit.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace('{pembayaran}', parsedArgs.pembayaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
edit.get = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
edit.head = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
    const editForm = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
        editForm.get = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\PembayaranController::edit
 * @see app/Http/Controllers/PembayaranController.php:53
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}/edit'
 */
        editForm.head = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    edit.form = editForm
/**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
export const update = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/tagihan/{tagihan}/pembayaran/{pembayaran}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
update.url = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tagihan: args[0],
                    pembayaran: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                                pembayaran: typeof args.pembayaran === 'object'
                ? args.pembayaran.id
                : args.pembayaran,
                }

    return update.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace('{pembayaran}', parsedArgs.pembayaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
update.put = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
update.patch = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
    const updateForm = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
        updateForm.put = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\PembayaranController::update
 * @see app/Http/Controllers/PembayaranController.php:58
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
        updateForm.patch = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PATCH',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    update.form = updateForm
/**
* @see \App\Http\Controllers\PembayaranController::destroy
 * @see app/Http/Controllers/PembayaranController.php:69
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
export const destroy = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/tagihan/{tagihan}/pembayaran/{pembayaran}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\PembayaranController::destroy
 * @see app/Http/Controllers/PembayaranController.php:69
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
destroy.url = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    tagihan: args[0],
                    pembayaran: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                                pembayaran: typeof args.pembayaran === 'object'
                ? args.pembayaran.id
                : args.pembayaran,
                }

    return destroy.definition.url
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace('{pembayaran}', parsedArgs.pembayaran.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\PembayaranController::destroy
 * @see app/Http/Controllers/PembayaranController.php:69
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
destroy.delete = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\PembayaranController::destroy
 * @see app/Http/Controllers/PembayaranController.php:69
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
    const destroyForm = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\PembayaranController::destroy
 * @see app/Http/Controllers/PembayaranController.php:69
 * @route '/tagihan/{tagihan}/pembayaran/{pembayaran}'
 */
        destroyForm.delete = (args: { tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } } | [tagihan: string | number | { id: string | number }, pembayaran: string | number | { id: string | number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const PembayaranController = { index, create, store, edit, update, destroy }

export default PembayaranController