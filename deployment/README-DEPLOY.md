# Deployment — Mănăstirea Sf. Dionisie și Sf. Efrem cel Nou

## Server

- **VPS:** Hetzner (partajat cu DryElegance, MeniuLegal, expert-copiatoare)
- **Port intern:** 3015
- **Domeniu:** manastire.clickstanga.ro

## Pași de deploy

```bash
# 1. SSH pe VPS
ssh root@<IP_HETZNER>

# 2. Clonare repo
cd /opt
sudo git clone https://github.com/timelligence/manastirea-sf-efrem.git manastire-sf-efrem
cd manastire-sf-efrem

# 3. Verifică portul liber
sudo ss -tlnp | grep 3015

# 4. Build & start container
docker compose up -d --build

# 5. Verifică loguri
docker compose logs --tail=50 manastire-web

# 6. Test local (din VPS)
curl -I http://127.0.0.1:3015

# 7. Nginx — copie config
sudo cp deployment/nginx-manastire.conf /etc/nginx/sites-available/manastire.clickstanga.ro
sudo ln -s /etc/nginx/sites-available/manastire.clickstanga.ro /etc/nginx/sites-enabled/

# 8. IMPORTANT: Înainte de reload, comentează blocul SSL
#    (nu ai certificate încă). Editează fișierul:
sudo nano /etc/nginx/sites-available/manastire.clickstanga.ro
#    → Comentează tot blocul "server { listen 443 ... }"

# 9. Test & reload nginx (doar cu blocul HTTP activ)
sudo nginx -t && sudo systemctl reload nginx

# 10. Certificat SSL
sudo certbot --nginx -d manastire.clickstanga.ro

# 11. Reload final
sudo systemctl reload nginx

# 12. Test final
curl -I https://manastire.clickstanga.ro
```

## Actualizare

```bash
cd /opt/manastire-sf-efrem
git pull
docker compose up -d --build
```

## Variabile de mediu

| Variabilă | Valoare | Descriere |
|-----------|---------|-----------|
| `NODE_ENV` | `production` | Mod producție |
| `NEXT_PUBLIC_SITE_URL` | `https://manastire.clickstanga.ro` | URL canonic |
| `NEXT_PUBLIC_SITE_STATUS` | `draft` | Arată banner draft |

## Porturi folosite pe VPS

| Port | Serviciu |
|------|----------|
| 3010 | DryElegance |
| 3011 | MeniuLegal |
| 3012 | expert-copiatoare |
| **3015** | **manastire-sf-efrem** |

## Note

- **robots.txt în nginx** blochează crawlerii cât site-ul e în draft. Când se aprobă publicarea, elimină blocul `location = /robots.txt` din nginx config.
- **Content MDX** este copiat în container la build. Pentru actualizări de conținut → rebuild container.
- Imaginile drone (hero, aerial) sunt în `public/images/` și se servesc static.
