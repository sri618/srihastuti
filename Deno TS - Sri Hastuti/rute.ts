import {Router} from 'https://deno.land/x/oak/mod.ts';
import { home, signup, kategori, login, logout } from './controllers/blog.ts';

const router = new Router();

router
    .get("/", home)
    .get("/daftar", signup)
    .post("/daftar", signup)
    .get('/login', login)
    .post('/login', login)
    .get('/logout', logout)
    .get("/kategori/:id", kategori)
    .get("/about", (ctx) => {
        ctx.response.body = "Ini halaman about";
    });
export default router;