
import { red, blue, alpha } from './util/colors'
import Heading from './Heading'
import {
  padding,
  handleToggle
} from './store'

const round = (n, d = 0) => {
  return n ? +n.toFixed(d) : ''
}

const Preview = ({
  fontFamily,
  scale,
  lineHeight,
  border,
  pad,
  padX,
  borderRadius,
  proportionalBorderRadius,
  showAllElements,
  getHeight,
  ...props
}) => {
  const paddingTop = padding.top + 'em'
  const paddingBottom = padding.bottom + 'em'

  const paddingLeft = `${padX}em`
  const paddingRight = paddingLeft

  const rowRules = `
    inset 0 1px ${alpha(red, 1/4)},
    inset 0 -1px ${alpha(red, 1/4)}
  `.replace(/\s\s+|\n/, ' ')
  const baseline = `
  linear-gradient(${alpha(red, 1/2)}0px, transparent 1px)
  `

  const cx = {
    root: {
      fontFamily: fontFamily + ', sans-serif',
      marginBottom: 16,
      overflowX: 'scroll',
    },
    row: {
      whiteSpace: 'nowrap',
      marginTop: 32,
      marginBottom: 8
    },
    code: {
      fontFamily: 'Menlo, monospace',
      fontSize: 12,
      marginLeft: 16,
      color: alpha(red, 1/4)
    },
    label: {
      display: 'inline-block',
      verticalAlign: 'baseline',
      minWidth: 96,
      marginRight: 16
    },
    input: {
      lineHeight,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      boxSizing: 'border-box',
      verticalAlign: 'baseline',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      backgroundColor: 'transparent',
      appearance: 'none',
      borderWidth: border,
      borderStyle: 'solid',
      borderColor: alpha('#000', 1/4),
      boxShadow: border ? 'none' : `inset 0 0 0 1px ${alpha('#000', 1/4)}`,
      borderRadius,
      margin: 0,
      marginRight: 16,
      ':focus': {
        outline: 'none',
        boxShadow: `inset 0 0 0 1px ${alpha(blue, 3/4)}`,
      },
      '::-moz-focus-inner': {
        border: 0,
        padding: 0,
        marginTop: -2,
        marginBottom: -2,
      }
    },
    button: {
      lineHeight,
      paddingTop,
      paddingBottom,
      paddingLeft,
      paddingRight,
      boxSizing: 'border-box',
      fontSize: 'inherit',
      fontFamily: 'inherit',
      display: 'inline-block',
      verticalAlign: 'baseline',
      color: 'white',
      backgroundColor: 'black',
      appearance: 'none',
      textDecoration: 'none',
      cursor: 'pointer',
      borderWidth: border,
      borderStyle: 'solid',
      borderColor: alpha('#fff', 1/4),
      borderRadius,
      margin: 0,
      marginRight: 16,
      '::-moz-focus-inner': {
        border: 0,
        padding: 0,
      }
    },
    extras: {
      display: 'inline-block'
    },
    footer: {
      textAlign: 'right'
    },
    checkbox: {
      fontSize: 12
    }
  }

  return (
    <div className={cx.root}>
      {/* Heading({ text: 'Preview' }) */}
      {scale.map((s, i) => {
        const radius = proportionalBorderRadius ? (borderRadius / 16 * s) : borderRadius
        const inputStyle = {
          ...cx.input,
          width: 256,
          borderRadius: radius
        }
        const buttonStyle = { ...cx.button, borderRadius: radius }

        return (
          <div>
            <div className={{
              ...cx.row,
              fontSize: s
            }}>
              {showAllElements ? (
                <label className={cx.label}>Label</label>
              ) : null}
              <input className={inputStyle}
                value={`${s}px Input`} />
              <button className={buttonStyle}>Button</button>
              {showAllElements ? (
                <div className={cx.extras}>
                  <a href='#!' className={buttonStyle}>Link Button</a>
                  <input type='button' className={buttonStyle} value='Input Button' />
                  <input className={inputStyle} placeholder='placeholder' />
                </div>
              ) : null}
            </div>
          </div>
        )
      })}
      <div className={cx.footer}>
        <label className={cx.checkbox}>
          <input
            name='showAllElements'
            type='checkbox'
            checked={showAllElements}
            onchange={(e) => handleToggle(e)} />

          Show more elements
        </label>
      </div>
    </div>
  )
}

export default Preview

