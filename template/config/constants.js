export const IS_ADMIN = process.env.NEXT_PUBLIC_ADMIN_PAGE === 'true';
export const IS_ADMIN_CHECK =
    process.env.NEXT_PUBLIC_ADMIN_CLAIMS_CHECK === 'true';

console.log({IS_ADMIN, IS_ADMIN_CHECK});
