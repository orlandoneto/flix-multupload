### TagProps Documentation

The `TagProps` type defines a set of properties that can be used to style React components. This type includes common CSS properties to provide a flexible and reusable way to apply styles directly via props. Below is a detailed explanation of each property.

```typescript
export type TagProps = {
  children?: React.ReactNode;
  pt?: string;
  pr?: string;
  pb?: string;
  pl?: string;
  mt?: string;
  mr?: string;
  mb?: string;
  ml?: string;
  color?: string;
  backgroundColor?: string;
  minHeight?: number;
  maxWidth?: number;
  width?: string | number;
  alignItems?: string;
  justifyContent?: string;
  m?: string;
  p?: string;
  border?: string;
  borderTop?: string;
  borderRight?: string;
  borderBottom?: string;
  borderLeft?: string;
  borderRadius?: string;
  display?: string;
  flexDirection?: string;
  flexWrap?: string;
  flexGrow?: number;
  flexShrink?: number;
  flexBasis?: string;
  justifySelf?: string;
  alignSelf?: string;
  order?: number;
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  top?: string;
  right?: string;
  bottom?: string;
  left?: string;
  zIndex?: number;
  fontFamily?: string;
  fontSize?: string;
  fontWeight?: string | number;
  lineHeight?: string;
  letterSpacing?: string;
  textAlign?: string;
  textDecoration?: string;
  textTransform?: string;
  whiteSpace?: string;
  wordBreak?: string;
  overflow?: string;
  overflowX?: string;
  overflowY?: string;
  backgroundImage?: string;
  backgroundSize?: string;
  backgroundPosition?: string;
  backgroundRepeat?: string;
  opacity?: number;
  boxShadow?: string;
  cursor?: string;
  visibility?: 'visible' | 'hidden' | 'collapse';
};
```

#### Properties

- **children**: `React.ReactNode`

  - The content to be rendered inside the component.

- **pt, pr, pb, pl**: `string`

  - Padding (top, right, bottom, left) values.

- **mt, mr, mb, ml**: `string`

  - Margin (top, right, bottom, left) values.

- **color**: `string`

  - Text color of the component.

- **backgroundColor**: `string`

  - Background color of the component.

- **minHeight**: `number`

  - Minimum height of the component.

- **maxWidth**: `number`

  - Maximum width of the component.

- **width**: `string | number`

  - Width of the component.

- **alignItems**: `string`

  - Align items along the cross axis.

- **justifyContent**: `string`
  - Justify content along the main axis.

#### Additional Properties

- **m**: `string`

  - Margin shorthand property.

- **p**: `string`

  - Padding shorthand property.

- **border**: `string`

  - Border property.

- **borderTop, borderRight, borderBottom, borderLeft**: `string`

  - Border properties for each side.

- **borderRadius**: `string`

  - Border radius property.

- **display**: `string`

  - Display property.

- **flexDirection**: `string`

  - Flexbox direction property.

- **flexWrap**: `string`

  - Flexbox wrap property.

- **flexGrow**: `number`

  - Flexbox grow property.

- **flexShrink**: `number`

  - Flexbox shrink property.

- **flexBasis**: `string`

  - Flexbox basis property.

- **justifySelf**: `string`

  - Justify self property.

- **alignSelf**: `string`

  - Align self property.

- **order**: `number`

  - Order property in flexbox.

- **position**: `'static' | 'relative' | 'absolute' | 'fixed' | 'sticky'`

  - Position property.

- **top, right, bottom, left**: `string`

  - Position offset properties.

- **zIndex**: `number`

  - Z-index property.

- **fontFamily**: `string`

  - Font family property.

- **fontSize**: `string`

  - Font size property.

- **fontWeight**: `string | number`

  - Font weight property.

- **lineHeight**: `string`

  - Line height property.

- **letterSpacing**: `string`

  - Letter spacing property.

- **textAlign**: `string`

  - Text alignment property.

- **textDecoration**: `string`

  - Text decoration property.

- **textTransform**: `string`

  - Text transform property.

- **whiteSpace**: `string`

  - White space property.

- **wordBreak**: `string`

  - Word break property.

- **overflow**: `string`

  - Overflow property.

- **overflowX, overflowY**: `string`

  - Overflow properties for X and Y axes.

- **backgroundImage**: `string`

  - Background image property.

- **backgroundSize**: `string`

  - Background size property.

- **backgroundPosition**: `string`

  - Background position property.

- **backgroundRepeat**: `string`

  - Background repeat property.

- **opacity**: `number`

  - Opacity property.

- **boxShadow**: `string`

  - Box shadow property.

- **cursor**: `string`

  - Cursor property.

- **visibility**: `'visible' | 'hidden' | 'collapse'`
  - Visibility property.

These properties provide a comprehensive set of CSS attributes that can be used to style components dynamically through props, enabling a high level of customization and flexibility.
