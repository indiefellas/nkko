import type { APIRoute } from "astro";
import * as Db from '../include/db';
export const prerender = false;

export const GET: APIRoute = async ({ params, redirect }) => {
    let slug = params.slug;
    if (!slug) return new Response(null, { status: 404 });
    let long = await Db.getLongUrl(slug);
    if (!long) return new Response(null, { status: 404 });
    return redirect(long, 302);
}