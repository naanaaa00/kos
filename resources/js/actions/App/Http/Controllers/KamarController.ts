import { queryParams, type RouteQueryOptions, type RouteDefinition, type RouteFormDefinition, applyUrlDefaults } from './../../../../wayfinder'
/**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
 */
export const index = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})

index.definition = {
    methods: ["get","head"],
    url: '/kamar',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
 */
index.url = (options?: RouteQueryOptions) => {
    return index.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
 */
index.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: index.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
 */
index.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: index.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
 */
    const indexForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: index.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
 */
        indexForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: index.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KamarController::index
 * @see app/Http/Controllers/KamarController.php:15
 * @route '/kamar'
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
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
 */
export const create = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})

create.definition = {
    methods: ["get","head"],
    url: '/kamar/create',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
 */
create.url = (options?: RouteQueryOptions) => {
    return create.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
 */
create.get = (options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: create.url(options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
 */
create.head = (options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: create.url(options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
 */
    const createForm = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: create.url(options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
 */
        createForm.get = (options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: create.url(options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KamarController::create
 * @see app/Http/Controllers/KamarController.php:43
 * @route '/kamar/create'
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
* @see \App\Http\Controllers\KamarController::store
 * @see app/Http/Controllers/KamarController.php:50
 * @route '/kamar'
 */
export const store = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

store.definition = {
    methods: ["post"],
    url: '/kamar',
} satisfies RouteDefinition<["post"]>

/**
* @see \App\Http\Controllers\KamarController::store
 * @see app/Http/Controllers/KamarController.php:50
 * @route '/kamar'
 */
store.url = (options?: RouteQueryOptions) => {
    return store.definition.url + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::store
 * @see app/Http/Controllers/KamarController.php:50
 * @route '/kamar'
 */
store.post = (options?: RouteQueryOptions): RouteDefinition<'post'> => ({
    url: store.url(options),
    method: 'post',
})

    /**
* @see \App\Http\Controllers\KamarController::store
 * @see app/Http/Controllers/KamarController.php:50
 * @route '/kamar'
 */
    const storeForm = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: store.url(options),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KamarController::store
 * @see app/Http/Controllers/KamarController.php:50
 * @route '/kamar'
 */
        storeForm.post = (options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: store.url(options),
            method: 'post',
        })
    
    store.form = storeForm
/**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
export const edit = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})

edit.definition = {
    methods: ["get","head"],
    url: '/kamar/{kamar}/edit',
} satisfies RouteDefinition<["get","head"]>

/**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
edit.url = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kamar: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kamar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kamar: typeof args.kamar === 'object'
                ? args.kamar.id
                : args.kamar,
                }

    return edit.definition.url
            .replace('{kamar}', parsedArgs.kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
edit.get = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'get'> => ({
    url: edit.url(args, options),
    method: 'get',
})
/**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
edit.head = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'head'> => ({
    url: edit.url(args, options),
    method: 'head',
})

    /**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
    const editForm = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
        action: edit.url(args, options),
        method: 'get',
    })

            /**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
        editForm.get = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
            action: edit.url(args, options),
            method: 'get',
        })
            /**
* @see \App\Http\Controllers\KamarController::edit
 * @see app/Http/Controllers/KamarController.php:57
 * @route '/kamar/{kamar}/edit'
 */
        editForm.head = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'get'> => ({
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
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
export const update = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})

update.definition = {
    methods: ["put","patch"],
    url: '/kamar/{kamar}',
} satisfies RouteDefinition<["put","patch"]>

/**
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
update.url = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kamar: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kamar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kamar: typeof args.kamar === 'object'
                ? args.kamar.id
                : args.kamar,
                }

    return update.definition.url
            .replace('{kamar}', parsedArgs.kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
update.put = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'put'> => ({
    url: update.url(args, options),
    method: 'put',
})
/**
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
update.patch = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'patch'> => ({
    url: update.url(args, options),
    method: 'patch',
})

    /**
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
    const updateForm = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: update.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'PUT',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
        updateForm.put = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: update.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'PUT',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
            /**
* @see \App\Http\Controllers\KamarController::update
 * @see app/Http/Controllers/KamarController.php:65
 * @route '/kamar/{kamar}'
 */
        updateForm.patch = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
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
* @see \App\Http\Controllers\KamarController::destroy
 * @see app/Http/Controllers/KamarController.php:72
 * @route '/kamar/{kamar}'
 */
export const destroy = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

destroy.definition = {
    methods: ["delete"],
    url: '/kamar/{kamar}',
} satisfies RouteDefinition<["delete"]>

/**
* @see \App\Http\Controllers\KamarController::destroy
 * @see app/Http/Controllers/KamarController.php:72
 * @route '/kamar/{kamar}'
 */
destroy.url = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions) => {
    if (typeof args === 'string' || typeof args === 'number') {
        args = { kamar: args }
    }

            if (typeof args === 'object' && !Array.isArray(args) && 'id' in args) {
            args = { kamar: args.id }
        }
    
    if (Array.isArray(args)) {
        args = {
                    kamar: args[0],
                }
    }

    args = applyUrlDefaults(args)

    const parsedArgs = {
                        kamar: typeof args.kamar === 'object'
                ? args.kamar.id
                : args.kamar,
                }

    return destroy.definition.url
            .replace('{kamar}', parsedArgs.kamar.toString())
            .replace(/\/+$/, '') + queryParams(options)
}

/**
* @see \App\Http\Controllers\KamarController::destroy
 * @see app/Http/Controllers/KamarController.php:72
 * @route '/kamar/{kamar}'
 */
destroy.delete = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteDefinition<'delete'> => ({
    url: destroy.url(args, options),
    method: 'delete',
})

    /**
* @see \App\Http\Controllers\KamarController::destroy
 * @see app/Http/Controllers/KamarController.php:72
 * @route '/kamar/{kamar}'
 */
    const destroyForm = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
        action: destroy.url(args, {
                    [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                        _method: 'DELETE',
                        ...(options?.query ?? options?.mergeQuery ?? {}),
                    }
                }),
        method: 'post',
    })

            /**
* @see \App\Http\Controllers\KamarController::destroy
 * @see app/Http/Controllers/KamarController.php:72
 * @route '/kamar/{kamar}'
 */
        destroyForm.delete = (args: { kamar: number | { id: number } } | [kamar: number | { id: number } ] | number | { id: number }, options?: RouteQueryOptions): RouteFormDefinition<'post'> => ({
            action: destroy.url(args, {
                        [options?.mergeQuery ? 'mergeQuery' : 'query']: {
                            _method: 'DELETE',
                            ...(options?.query ?? options?.mergeQuery ?? {}),
                        }
                    }),
            method: 'post',
        })
    
    destroy.form = destroyForm
const KamarController = { index, create, store, edit, update, destroy }

export default KamarController