def user_record_owner(exc, *args, **kwargs):
    def inner_func(func):
        def wrapper(*func_args, **func_kwargs):
            record = kwargs["model"].objects.get(pk=func_kwargs.get(kwargs["pk_field"]))
            user = getattr(record, kwargs["field"])

            if user != func_args[1].context.user:
                raise exc

            func(*func_args, **func_kwargs)

        return wrapper
    return inner_func
