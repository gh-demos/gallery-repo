# Gallery URL Filtering Feature

## Overview
The gallery page now supports shareable, URL-based filtering with full browser navigation support.

## Features Implemented

### 1. URL Parameter Synchronization
Filter state is automatically synced to URL search parameters:

- **Search query**: `?q=sunset`
- **Tags**: `?tags=landscape,nature`
- **Page**: `?page=2`
- **Combined**: `?q=sunset&tags=landscape,nature&page=2`

### 2. Deep Link Support
Users can now share direct links to filtered gallery views:

```
/gallery?q=wedding&tags=portrait
/gallery?tags=landscape,nature&page=3
/gallery?q=architecture
```

### 3. Browser Navigation
- Back/forward buttons work correctly
- URL changes update the gallery immediately
- No full page reload on filter changes

## Testing Guide

### Test Deep Links
1. Navigate to: `/gallery?q=sunset&tags=landscape`
2. Verify the search input shows "sunset"
3. Verify the "landscape" tag is selected
4. Verify photos are filtered correctly

### Test URL Sync
1. Go to `/gallery`
2. Enter a search term
3. Check the URL updates to include `?q=yourterm`
4. Select a tag
5. Check the URL updates to include `&tags=selectedtag`

### Test Browser Navigation
1. Apply some filters on `/gallery`
2. Click to another page (e.g., `/upload`)
3. Click the browser back button
4. Verify filters are restored correctly
5. Click forward button
6. Verify you return to the upload page

### Test Invalid Parameters
1. Navigate to: `/gallery?tags=invalidtag,landscape`
2. Verify only "landscape" is selected (invalid tags are filtered out)
3. Navigate to: `/gallery?page=abc`
4. Verify page defaults to 1

## Technical Implementation

### Architecture
- **URL State Management**: `useSearchParams` + `useRouter`
- **Suspense Boundary**: Required for Next.js 15 static generation
- **Bidirectional Sync**: State ? URL and URL ? State

### Key Files Modified
- `src/app/gallery/page.tsx` - URL state management
- `src/components/gallery/GalleryGrid.tsx` - Server-side readiness

### Future Server-Side Migration
The component is documented and ready for server-side data fetching:

```typescript
// Future API endpoint
GET /api/photos?q={searchQuery}&tags={tag1,tag2}&page={currentPage}&limit={limit}

// Expected response
{
  photos: Photo[],
  total: number,
  page: number,
  hasMore: boolean
}
```

## Performance Notes
- URL updates use `router.replace` with `scroll: false` to avoid scroll jumps
- State updates are conditional to prevent unnecessary re-renders
- Tag validation happens on URL parse to ensure data integrity

## Known Limitations
- Currently uses client-side filtering (mock data)
- Tag validation is case-sensitive
- No URL encoding for special characters in search queries yet

## Next Steps for Full Production
1. Implement server-side API endpoint
2. Replace mock data with real API calls
3. Add URL encoding/decoding for special characters
4. Implement proper pagination (not just "load more")
5. Add analytics tracking for filter usage
