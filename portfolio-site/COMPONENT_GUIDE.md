# Component Usage Guide

## New Modern Components

### 1. ParticleField
Neural network background with connected particles.

```tsx
import ParticleField from './components/ParticleField';

<ParticleField />
```

**Features:**
- 800 animated particles
- Dynamic connection lines
- Mouse interaction
- Wave motion physics

---

### 2. DataGridBackground
Data-focused grid overlay with animations.

```tsx
import DataGridBackground from './components/DataGridBackground';

<DataGridBackground />
```

**Features:**
- Morphing gradient mesh
- SVG grid pattern
- Scanning line effect
- Floating data points

---

### 3. CursorFollower
Magnetic cursor with trail effects.

```tsx
import CursorFollower from './components/CursorFollower';

{!reduceMotion && <CursorFollower />}
```

**Features:**
- Magnetic pull to interactive elements
- Particle trail
- Spring physics
- Multiple states (default, hover, click)

---

### 4. ScrollProgress
Dual progress indicators for scroll position.

```tsx
import ScrollProgress from './components/ScrollProgress';

<ScrollProgress />
```

**Features:**
- Top progress bar
- Circular indicator (bottom-right)
- Spring physics
- Responsive

---

### 5. SectionDivider
Animated dividers between sections.

```tsx
import SectionDivider from './components/SectionDivider';

<SectionDivider variant="gradient" />
<SectionDivider variant="data" />
<SectionDivider variant="wave" />
<SectionDivider variant="pulse" />
```

**Variants:**
- **gradient**: Simple animated line
- **data**: Bar chart visualization
- **wave**: SVG wave animation
- **pulse**: Pulsing dots with lines

---

### 6. AnimatedDataIcon
Animated logo/icon component.

```tsx
import AnimatedDataIcon from './components/AnimatedDataIcon';

<AnimatedDataIcon size={40} className="text-emerald-400" />
```

**Props:**
- `size`: Icon size in pixels (default: 40)
- `className`: Additional CSS classes

---

## Updated Components

### ProjectGallery
Enhanced with 3D effects and mouse tracking.

**New Features:**
- 3D tilt on hover
- Radial gradient overlay
- Corner accents
- Improved animations

---

## Animation Utilities

### Common Framer Motion Patterns

#### Fade In on Scroll
```tsx
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
>
  Content
</motion.div>
```

#### Stagger Children
```tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: { transition: { staggerChildren: 0.1 } }
  }}
>
  {items.map((item, i) => (
    <motion.div
      key={i}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
      {item}
    </motion.div>
  ))}
</motion.div>
```

#### Hover Scale
```tsx
<motion.button
  whileHover={{ scale: 1.05, y: -2 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: 'spring', stiffness: 400 }}
>
  Click me
</motion.button>
```

#### Gradient Text Animation
```tsx
<motion.span
  className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent"
  animate={{
    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
  }}
  transition={{
    duration: 5,
    repeat: Infinity,
    ease: "linear"
  }}
  style={{
    backgroundSize: '200% 200%',
  }}
>
  Animated Text
</motion.span>
```

---

## Color Utilities

### Gradient Classes

```css
/* Text Gradients */
.gradient-text-emerald-cyan
  bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent

/* Background Gradients */
.gradient-bg-emerald-cyan
  bg-gradient-to-r from-emerald-500/10 to-cyan-500/10

/* Border Gradients */
.gradient-border
  border-image: linear-gradient(to right, #10b981, #06b6d4) 1
```

### Custom Colors

```js
emerald: {
  400: '#10b981',
  500: '#059669',
}
cyan: {
  400: '#06b6d4',
  500: '#0891b2',
}
slate: {
  50: '#f8fafc',
  100: '#f1f5f9',
  // ... through 950
}
```

---

## Performance Tips

1. **Use `useReducedMotion()`** to respect user preferences
2. **Lazy load heavy components** with `React.lazy()`
3. **Optimize Three.js** with pixel ratio capping
4. **Use `viewport={{ once: true }}`** for scroll animations
5. **Debounce resize handlers** in particle systems

---

## Accessibility

- All animations respect `prefers-reduced-motion`
- Interactive elements have proper focus states
- Color contrast ratios meet WCAG AA standards
- Semantic HTML structure maintained

---

## Browser Support

- **Chrome/Edge**: Full support
- **Firefox**: Full support
- **Safari**: Full support (14+)
- **Mobile**: Optimized with reduced effects

---

## Troubleshooting

### Animations not showing?
- Check `useReducedMotion()` isn't blocking animations
- Verify Framer Motion is imported correctly
- Ensure parent has `overflow: visible`

### Performance issues?
- Reduce particle count in ParticleField
- Disable cursor trail on mobile
- Use `transform` instead of `top/left` for animations

### Build errors?
- Run `npm install` to ensure all dependencies
- Clear `.vite` cache folder
- Check TypeScript types are correct

---

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Three.js Docs](https://threejs.org/docs/)
- [React Spring Docs](https://www.react-spring.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
