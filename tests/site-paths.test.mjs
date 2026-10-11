import test from 'node:test';
import assert from 'node:assert/strict';
import { sitePath, stripSiteBase } from '../src/site-paths.js';

test('bundled assets and navigation work at the root and under a Pages repository', () => {
  for (const base of ['/', '/DADA/']) {
    assert.equal(sitePath('/assets/branding/dada-logo-blue.png', base), `${base}assets/branding/dada-logo-blue.png`);
    assert.equal(sitePath('/consultancy/', base), `${base}consultancy/`);
    assert.equal(sitePath('/', base), base);
    assert.equal(sitePath('/consultancy/#work', base), `${base}consultancy/#work`);
    assert.equal(stripSiteBase(`${base}consultancy/work/ss-builders/`, base), '/consultancy/work/ss-builders/');
  }
});

test('external, contact, anchor, and already-prefixed URLs stay intact', () => {
  for (const path of ['https://example.com/work', '//example.com/work', 'mailto:team@example.com', 'tel:+919999999999', '#contact', '?view=work', '/DADA/consultancy/']) {
    assert.equal(sitePath(path, '/DADA/'), path);
  }
  assert.equal(stripSiteBase('/DADA-other/consultancy/', '/DADA/'), '/DADA-other/consultancy/');
});
