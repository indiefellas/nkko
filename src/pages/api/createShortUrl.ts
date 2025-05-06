import type { APIRoute } from "astro";
import * as Db from '../../include/db';
export const prerender = false;

export const POST: APIRoute = async ({ request, url }) => {
    const formData = await request.formData();
    const u = formData.get('url')?.toString();
    const id = formData.get('id')?.toString();
    if (!u) {
        return new Response(JSON.stringify({ error: 'URL is not defined' }), { status: 400 });
    }
    const ext = await Db.getLongUrl(id ?? '');
    if (ext) {
        return new Response(JSON.stringify({ error: 'Slug already exists' }), { status: 400 });
    }
    const slug = await Db.setShortUrl(u, id);
    return new Response(
        JSON.stringify({ slug, url: `${url.protocol}//${url.host}/${slug}` }),
        { headers: { 'Content-Type': 'application/json' } }
    );
};