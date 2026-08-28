# Redux Authentication State Fix

## Issue

The Sidebar would display the user as **"Guest"** after refreshing or reloading the application, even though the user was still authenticated.

Redux authentication state was being reset to its initial state:

- `isAuth: false`
- `username: ""`
- `email: ""`

The JWT was still stored in `localStorage`, but the user information was not being restored into Redux.

## Fix

Updated the `ReduxProvider` to restore the authenticated user when the application loads.

The provider now:

1. Checks `localStorage` for the `access_token`.
2. Calls `getCurrentUser()` if a token exists.
3. Retrieves the authenticated user's information from FastAPI.
4. Dispatches `logIn()` to restore the user information into Redux.
5. Removes the token if the user cannot be restored.

Logout was also updated to remove the `access_token` from `localStorage` when the user logs out.

## Result

- User remains authenticated after page refresh.
- Sidebar correctly displays the authenticated username.
- Sidebar no longer incorrectly displays "Guest" after refreshing.
- Navigation between dashboard pages maintains the authentication state.
- Logout clears both Redux authentication state and the stored JWT.
- Refreshing after logout keeps the user logged out.

## Files Updated

- `app/layout.tsx`
- `redux/provider.tsx`
