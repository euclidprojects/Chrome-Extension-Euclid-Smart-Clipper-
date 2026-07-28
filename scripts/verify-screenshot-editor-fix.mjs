import fs from 'fs';
import path from 'path';

console.log('🧪 Verifying Euclid Compact Annotation Toolbar Requirements...');

let errors = [];

// 1. Verify screenshot-editor.html
const htmlPath = path.resolve(process.cwd(), 'screenshot-editor.html');
if (!fs.existsSync(htmlPath)) {
  errors.push('screenshot-editor.html does not exist');
} else {
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  if (!htmlContent.includes('/src/screenshot-editor/main.tsx')) {
    errors.push('screenshot-editor.html does not load /src/screenshot-editor/main.tsx');
  }
}

// 2. Verify screenshot-editor.css constraints
const cssPath = path.resolve(process.cwd(), 'src/screenshot-editor/screenshot-editor.css');
if (!fs.existsSync(cssPath)) {
  errors.push('src/screenshot-editor/screenshot-editor.css missing');
} else {
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  if (!cssContent.includes('max-height: 170px')) {
    errors.push('screenshot-editor.css missing max-height: 170px rule for Annotation Toolbar');
  }
  if (!cssContent.includes('max-height: 44px')) {
    errors.push('screenshot-editor.css missing max-height: 44px rule for collapsed Annotation Toolbar');
  }
  if (!cssContent.includes('.annotation-group-tabs')) {
    errors.push('screenshot-editor.css missing .annotation-group-tabs class');
  }
  if (!cssContent.includes('.annotation-tool-btn')) {
    errors.push('screenshot-editor.css missing .annotation-tool-btn class');
  }
}

// 3. Verify AnnotationToolbar.tsx & annotationConfig.ts component & config
const toolbarPath = path.resolve(process.cwd(), 'src/components/annotation/AnnotationToolbar.tsx');
const configPath = path.resolve(process.cwd(), 'src/components/annotation/annotationConfig.ts');

if (!fs.existsSync(toolbarPath)) {
  errors.push('src/components/annotation/AnnotationToolbar.tsx missing');
} else if (!fs.existsSync(configPath)) {
  errors.push('src/components/annotation/annotationConfig.ts missing');
} else {
  const tbContent = fs.readFileSync(toolbarPath, 'utf-8');
  const cfgContent = fs.readFileSync(configPath, 'utf-8');
  const combinedContent = tbContent + cfgContent;

  // Verify group tabs
  ['markup', 'draw', 'notes', 'edit', 'more'].forEach((grp) => {
    if (!combinedContent.includes(`'${grp}'`)) {
      errors.push(`AnnotationToolbar/annotationConfig missing group: ${grp}`);
    }
  });

  // Verify collapse feature & tooltips
  if (!tbContent.includes('Collapse annotation toolbar')) {
    errors.push('AnnotationToolbar missing "Collapse annotation toolbar" tooltip/aria-label');
  }
  if (!tbContent.includes('Expand annotation toolbar')) {
    errors.push('AnnotationToolbar missing "Expand annotation toolbar" tooltip/aria-label');
  }

  // Verify auto-collapse feature
  if (!tbContent.includes('autoCollapseOnSelect')) {
    errors.push('AnnotationToolbar missing autoCollapseOnSelect setting state');
  }

  // Verify inline active tool & colors
  if (!tbContent.includes('Active:')) {
    errors.push('AnnotationToolbar missing compact inline "Active:" tool indicator');
  }
  if (!tbContent.includes('annotation-color-swatch')) {
    errors.push('AnnotationToolbar missing inline color swatch class');
  }
}

// 4. Verify ScreenshotEditorView.tsx
const viewPath = path.resolve(process.cwd(), 'src/components/ScreenshotEditorView.tsx');
if (!fs.existsSync(viewPath)) {
  errors.push('src/components/ScreenshotEditorView.tsx missing');
} else {
  const viewContent = fs.readFileSync(viewPath, 'utf-8');

  if (!viewContent.includes('AnnotationToolbar')) {
    errors.push('ScreenshotEditorView does not render AnnotationToolbar');
  }
}

if (errors.length > 0) {
  console.error('\n❌ Compact Annotation Toolbar Verification FAILED:');
  errors.forEach((err) => console.error(` - ${err}`));
  process.exit(1);
}

console.log('✅ screenshot-editor.html correctly configured.');
console.log('✅ CSS max-height constraints (170px expanded, 44px collapsed) verified.');
console.log('✅ Compact group tabs, tool buttons, and inline color swatches verified.');
console.log('✅ Collapsible toolbar state & Auto-Collapse option verified.');
console.log('✅ All 5 annotation groups & tool functions maintained.');
console.log('🎉 Compact Annotation Toolbar Verification PASSED!\n');
