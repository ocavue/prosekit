# prosekit/extensions/code-block

<a id="CodeBlockAttrs" name="CodeBlockAttrs"></a>

## CodeBlockAttrs

The attributes for the `codeBlock` node.

### Properties

<a id="language" name="language"></a>

#### language?

> **`optional`** **language**: `string`

***

<a id="HighlightParser" name="HighlightParser"></a>

## HighlightParser

> **HighlightParser**: `Parser`

An alias for the `Parser` type from the `prosemirror-highlight` package.

***

<a id="defineCodeBlock" name="defineCodeBlock"></a>

## defineCodeBlock()

> **defineCodeBlock**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

Adds `codeBlock` nodes to the editor. This includes the following extensions:

- [defineCodeBlockSpec](code-block.md#defineCodeBlockSpec)
- [defineCodeBlockInputRule](code-block.md#defineCodeBlockInputRule)
- [defineCodeBlockEnterRule](code-block.md#defineCodeBlockEnterRule)
- defineCodeBlockKeymap
- [defineCodeBlockCommands](code-block.md#defineCodeBlockCommands).

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.insertCodeBlock` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `COMMAND_ARGS.setCodeBlock` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `COMMAND_ARGS.setCodeBlockAttrs` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `COMMAND_ARGS.toggleCodeBlock` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `NODES` | `"codeBlock"` | - |
>

***

<a id="defineCodeBlockCommands" name="defineCodeBlockCommands"></a>

## defineCodeBlockCommands()

> **defineCodeBlockCommands**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

Adds commands for working with `codeBlock` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type | Value |
> | :------ | :------ | :------ |
> | `COMMAND_ARGS` | `object` | - |
> | `COMMAND_ARGS.insertCodeBlock` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `COMMAND_ARGS.setCodeBlock` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `COMMAND_ARGS.setCodeBlockAttrs` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
> | `COMMAND_ARGS.toggleCodeBlock` | [[`CodeBlockAttrs`](code-block.md#CodeBlockAttrs)] | - |
>

***

<a id="defineCodeBlockEnterRule" name="defineCodeBlockEnterRule"></a>

## defineCodeBlockEnterRule()

> **defineCodeBlockEnterRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Adds enter rules for `codeBlock` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineCodeBlockHighlight" name="defineCodeBlockHighlight"></a>

## defineCodeBlockHighlight()

> **defineCodeBlockHighlight**(`__namedParameters`): [`Extension`](../core.md#ExtensionT)

Adds syntax highlighting to code blocks. This function requires a `Parser`
instance from the `prosemirror-highlight` package. See the
[documentation](https://github.com/ocavue/prosemirror-highlight) for more
information.

### Parameters

• **\_\_namedParameters**

• **\_\_namedParameters\.parser**: `Parser`

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineCodeBlockInputRule" name="defineCodeBlockInputRule"></a>

## defineCodeBlockInputRule()

> **defineCodeBlockInputRule**(): [`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

Adds input rules for `codeBlock` nodes.

### Returns

[`Extension`](../core.md#ExtensionT)\<`ExtensionTyping`\<`string`, `string`, `CommandArgs`\>\>

***

<a id="defineCodeBlockShiki" name="defineCodeBlockShiki"></a>

## defineCodeBlockShiki()

> **defineCodeBlockShiki**(`__namedParameters`): [`Extension`](../core.md#ExtensionT)

Adds syntax highlighting to code blocks using the [shiki](https://github.com/shikijs/shiki) package.

### Parameters

• **\_\_namedParameters**: `CodeBlockShikiOptions`= `{}`

### Returns

[`Extension`](../core.md#ExtensionT)

***

<a id="defineCodeBlockSpec" name="defineCodeBlockSpec"></a>

## defineCodeBlockSpec()

> **defineCodeBlockSpec**(): [`Extension`](../core.md#ExtensionT)\<`object`\>

Defines the `codeBlock` node spec.

### Returns

[`Extension`](../core.md#ExtensionT)\<`object`\>

> | Member | Type |
> | :------ | :------ |
> | `NODES` | `"codeBlock"` |
>