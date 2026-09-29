import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/sewa',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SewaController::index
 * @see app/Http/Controllers/SewaController.php:17
 * @route '/sewa'
 */
        indexForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    index.form = indexForm
/**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/sewa/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SewaController::create
 * @see app/Http/Controllers/SewaController.php:40
 * @route '/sewa/create'
 */
        createForm.head = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url({
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'HEAD',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'get',
        })
    
    create.form = createForm
/**
* @see \App\Http\Controllers\SewaController::store
 * @see app/Http/Controllers/SewaController.php:48
 * @route '/sewa'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/sewa',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\SewaController::store
 * @see app/Http/Controllers/SewaController.php:48
 * @route '/sewa'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\SewaController::store
 * @see app/Http/Controllers/SewaController.php:48
 * @route '/sewa'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\SewaController::store
 * @see app/Http/Controllers/SewaController.php:48
 * @route '/sewa'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SewaController::store
 * @see app/Http/Controllers/SewaController.php:48
 * @route '/sewa'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
export const edit = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/sewa/{sewa}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
edit.url = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return edit.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
edit.get = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
edit.head = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
    const editForm = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
        editForm.get = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\SewaController::edit
 * @see app/Http/Controllers/SewaController.php:72
 * @route '/sewa/{sewa}/edit'
 */
        editForm.head = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
export const update = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/sewa/{sewa}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
update.url = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return update.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
update.put = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
update.patch = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
    const updateForm = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
        updateForm.put = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\SewaController::update
 * @see app/Http/Controllers/SewaController.php:85
 * @route '/sewa/{sewa}'
 */
        updateForm.patch = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\SewaController::destroy
 * @see app/Http/Controllers/SewaController.php:112
 * @route '/sewa/{sewa}'
 */
export const destroy = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/sewa/{sewa}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\SewaController::destroy
 * @see app/Http/Controllers/SewaController.php:112
 * @route '/sewa/{sewa}'
 */
destroy.url = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
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

    return destroy.definition.url
            .replace('{sewa}', parsedArgs.sewa.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\SewaController::destroy
 * @see app/Http/Controllers/SewaController.php:112
 * @route '/sewa/{sewa}'
 */
destroy.delete = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\SewaController::destroy
 * @see app/Http/Controllers/SewaController.php:112
 * @route '/sewa/{sewa}'
 */
    const destroyForm = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\SewaController::destroy
 * @see app/Http/Controllers/SewaController.php:112
 * @route '/sewa/{sewa}'
 */
        destroyForm.delete = (args: { sewa: number | { id: number } } | [sewa: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const SewaController = { index, create, store, edit, update, destroy }

export default SewaController