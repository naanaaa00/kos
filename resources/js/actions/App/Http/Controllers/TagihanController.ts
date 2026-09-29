import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
export const index = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sewa/{sewa}/tagihan',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
index.url = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sewa: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sewa: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sewa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sewa: typeof args.sewa === 'object'
                ? args.sewa.id
                : args.sewa,
                }

    return index.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
index.get = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
index.head = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
    const indexForm = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
        indexForm.get = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanController::index
 * @see app/Http/Controllers/TagihanController.php:15
 * @route '/sewa/{sewa}/tagihan'
 */
        indexForm.head = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
export const create = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sewa/{sewa}/tagihan/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
create.url = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sewa: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sewa: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sewa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sewa: typeof args.sewa === 'object'
                ? args.sewa.id
                : args.sewa,
                }

    return create.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
create.get = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
create.head = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
    const createForm = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
        createForm.get = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanController::create
 * @see app/Http/Controllers/TagihanController.php:35
 * @route '/sewa/{sewa}/tagihan/create'
 */
        createForm.head = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TagihanController::store
 * @see app/Http/Controllers/TagihanController.php:42
 * @route '/sewa/{sewa}/tagihan'
 */
export const store = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sewa/{sewa}/tagihan',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\TagihanController::store
 * @see app/Http/Controllers/TagihanController.php:42
 * @route '/sewa/{sewa}/tagihan'
 */
store.url = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { sewa: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { sewa: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    sewa: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sewa: typeof args.sewa === 'object'
                ? args.sewa.id
                : args.sewa,
                }

    return store.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanController::store
 * @see app/Http/Controllers/TagihanController.php:42
 * @route '/sewa/{sewa}/tagihan'
 */
store.post = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(args, options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\TagihanController::store
 * @see app/Http/Controllers/TagihanController.php:42
 * @route '/sewa/{sewa}/tagihan'
 */
    const storeForm = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(args, options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TagihanController::store
 * @see app/Http/Controllers/TagihanController.php:42
 * @route '/sewa/{sewa}/tagihan'
 */
        storeForm.post = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(args, options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
export const edit = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sewa/{sewa}/tagihan/{tagihan}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
edit.url = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    sewa: args[0],
                    tagihan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sewa: typeof args.sewa === 'object'
                ? args.sewa.id
                : args.sewa,
                                tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                }

    return edit.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
edit.get = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
edit.head = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
    const editForm = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
        editForm.get = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\TagihanController::edit
 * @see app/Http/Controllers/TagihanController.php:53
 * @route '/sewa/{sewa}/tagihan/{tagihan}/edit'
 */
        editForm.head = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
export const update = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sewa/{sewa}/tagihan/{tagihan}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
update.url = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    sewa: args[0],
                    tagihan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sewa: typeof args.sewa === 'object'
                ? args.sewa.id
                : args.sewa,
                                tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                }

    return update.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
update.put = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
update.patch = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
    const updateForm = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
        updateForm.put = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\TagihanController::update
 * @see app/Http/Controllers/TagihanController.php:60
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
        updateForm.patch = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\TagihanController::destroy
 * @see app/Http/Controllers/TagihanController.php:71
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
export const destroy = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sewa/{sewa}/tagihan/{tagihan}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\TagihanController::destroy
 * @see app/Http/Controllers/TagihanController.php:71
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
destroy.url = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions) => {
    if (Array.isArray(args)) {
        args = {
                    sewa: args[0],
                    tagihan: args[1],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        sewa: typeof args.sewa === 'object'
                ? args.sewa.id
                : args.sewa,
                                tagihan: typeof args.tagihan === 'object'
                ? args.tagihan.id
                : args.tagihan,
                }

    return destroy.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace('{tagihan}', parsedArgs.tagihan.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\TagihanController::destroy
 * @see app/Http/Controllers/TagihanController.php:71
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
destroy.delete = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\TagihanController::destroy
 * @see app/Http/Controllers/TagihanController.php:71
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
    const destroyForm = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\TagihanController::destroy
 * @see app/Http/Controllers/TagihanController.php:71
 * @route '/sewa/{sewa}/tagihan/{tagihan}'
 */
        destroyForm.delete = (args: { sewa: number | { id: number }, tagihan: number | { id: number } } | [sewa: number | { id: number }, tagihan: number | { id: number } ], options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const TagihanController = { index, create, store, edit, update, destroy }

export default TagihanController