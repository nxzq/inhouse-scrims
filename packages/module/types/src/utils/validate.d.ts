import * as yup from 'yup'
/**
 * yup validation schema for input
 */
export declare const inputSchema: yup.ArraySchema<
  import('yup/lib/object').OptionalObjectSchema<
    {
      name: import('yup/lib/string').RequiredStringSchema<
        string,
        import('yup/lib/types').AnyObject
      >
      elo: import('yup/lib/string').RequiredStringSchema<
        string,
        import('yup/lib/types').AnyObject
      >
      roles: yup.ArraySchema<
        yup.StringSchema<string, import('yup/lib/types').AnyObject, string>,
        import('yup/lib/types').AnyObject,
        string[],
        string[]
      >
    },
    import('yup/lib/object').AnyObject,
    import('yup/lib/object').TypeOfShape<{
      name: import('yup/lib/string').RequiredStringSchema<
        string,
        import('yup/lib/types').AnyObject
      >
      elo: import('yup/lib/string').RequiredStringSchema<
        string,
        import('yup/lib/types').AnyObject
      >
      roles: yup.ArraySchema<
        yup.StringSchema<string, import('yup/lib/types').AnyObject, string>,
        import('yup/lib/types').AnyObject,
        string[],
        string[]
      >
    }>
  >,
  import('yup/lib/types').AnyObject,
  import('yup/lib/object').TypeOfShape<{
    name: import('yup/lib/string').RequiredStringSchema<
      string,
      import('yup/lib/types').AnyObject
    >
    elo: import('yup/lib/string').RequiredStringSchema<
      string,
      import('yup/lib/types').AnyObject
    >
    roles: yup.ArraySchema<
      yup.StringSchema<string, import('yup/lib/types').AnyObject, string>,
      import('yup/lib/types').AnyObject,
      string[],
      string[]
    >
  }>[],
  import('yup/lib/object').AssertsShape<{
    name: import('yup/lib/string').RequiredStringSchema<
      string,
      import('yup/lib/types').AnyObject
    >
    elo: import('yup/lib/string').RequiredStringSchema<
      string,
      import('yup/lib/types').AnyObject
    >
    roles: yup.ArraySchema<
      yup.StringSchema<string, import('yup/lib/types').AnyObject, string>,
      import('yup/lib/types').AnyObject,
      string[],
      string[]
    >
  }>[]
>
