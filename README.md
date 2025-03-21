# 🚀 Modern Angular & PrimeNG Projesi

Modern ve kullanıcı dostu bir web uygulaması geliştirmek için hazırlanmış başlangıç şablonu.

## ✨ Özellikler

- 🎯 Angular 17+ ve Standalone Bileşenler
- 🎨 PrimeNG UI Bileşenleri
- 📦 RxJS ile Durum Yönetimi
- 🔐 JWT Tabanlı Kimlik Doğrulama
- 🌐 HTTP Interceptor'lar
- 💅 Modern ve Responsive Tasarım
- 🛡️ Merkezi Hata Yönetimi
- 🔄 Akıllı HTTP İstek Yönetimi

## 🛠️ Teknik Özellikler ve Kavramlar

### 🌐 HttpService Nedir?
HttpService, HTTP isteklerini merkezi olarak yöneten akıllı bir servis katmanıdır.

#### Temel Özellikleri:
- 🔄 Otomatik yeniden deneme mekanizması
- 🔐 JWT token yönetimi
- 📡 İstek önbelleği (caching)
- 🚦 İstek durumu takibi

```typescript
// HttpService Kullanım Örneği
@Injectable({ providedIn: 'root' })
export class HttpService {
  get<T>(endpoint: string, params?: any): Observable<T> {
    return this.http.get<T>(this.apiUrl + endpoint, { params }).pipe(
      retry(3), // 3 kez otomatik yeniden deneme
      catchError(this.handleError)
    );
  }

  post<T>(endpoint: string, body: any): Observable<T> {
    return this.http.post<T>(this.apiUrl + endpoint, body).pipe(
      catchError(this.handleError)
    );
  }
}

// Kullanım örneği
const users = await this.httpService.get<User[]>('/users');
```

### ⚠️ ErrorService Nedir?
ErrorService, uygulama genelinde hata yönetimini sağlayan merkezi bir servistir.

#### Temel Özellikleri:
- 🎯 Özelleştirilmiş hata mesajları
- 🔔 PrimeNG Toast entegrasyonu
- 📝 Hata loglama
- 🔄 Hata kurtarma stratejileri

```typescript
// ErrorService Kullanım Örneği
@Injectable({ providedIn: 'root' })
export class ErrorService {
  handleError(error: any): void {
    if (error.status === 401) {
      // Oturum hatası
      this.messageService.add({
        severity: 'error',
        summary: 'Oturum Hatası',
        detail: 'Lütfen tekrar giriş yapın'
      });
      this.router.navigate(['/login']);
    } else if (error.status === 404) {
      // Kaynak bulunamadı
      this.messageService.add({
        severity: 'warn',
        summary: 'Bulunamadı',
        detail: 'İstediğiniz kaynak bulunamadı'
      });
    }
  }
}
```

### 🔄 Observable Nedir?
Observable, Angular'da veri akışlarını yönetmek için kullanılan temel bir yapıdır.

#### Temel Özellikleri:
- 📡 Sürekli veri akışı sağlar
- 🔄 Asenkron işlemleri kolayca yönetir
- 🎯 Veri değişikliklerini anlık olarak takip eder

```typescript
// Observable Kullanım Örneği
import { Observable } from 'rxjs';

// Servis örneği
getKullanicilar(): Observable<Kullanici[]> {
  return this.http.get<Kullanici[]>('/api/kullanicilar').pipe(
    map(kullanicilar => kullanicilar.filter(k => k.aktif))
  );
}

// Komponent örneği
kullanicilar$ = this.kullaniciService.getKullanicilar();
```

### 🚦 Route Guards ve Yönlendirme Koruması
Route Guards, uygulamanızda sayfa erişimlerini kontrol eden güvenlik katmanıdır.

#### Guard Türleri:
- 🛡️ **CanActivate**: Sayfaya erişimi kontrol eder
- 👨‍👦 **CanActivateChild**: Alt sayfalara erişimi kontrol eder
- 🚪 **CanDeactivate**: Sayfadan çıkışı kontrol eder
- 📥 **Resolve**: Sayfa yüklenmeden önce veri yükler

```typescript
// Auth Guard Örneği
@Injectable({ providedIn: 'root' })
export class AuthGuard {
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated$.pipe(
      map(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/giris']);
          return false;
        }
        return true;
      })
    );
  }
}
```

### 🧩 Lazy Loading Nedir?
Lazy loading, uygulamanın performansını artırmak için kullanılan bir tekniktir.

#### Avantajları:
- 🚀 Başlangıç yükleme süresini kısaltır
- 📦 Modülleri ihtiyaç duyulduğunda yükler
- 💾 Bellek kullanımını optimize eder

```typescript
// Lazy Loading Route Örneği
const routes: Routes = [
  {
    path: 'panel',
    loadChildren: () => import('./panel/panel.module')
      .then(m => m.PanelModule)
  }
];
```

### 🎯 Standalone Component Nedir?
Standalone component'ler, NgModule'den bağımsız çalışabilen modern Angular bileşenleridir.

#### Faydaları:
- 📦 Daha küçük paket boyutu
- 🛠️ Kolay bakım
- 🔄 Basitleştirilmiş bağımlılık yönetimi

```typescript
// Standalone Component Örneği
@Component({
  selector: 'app-profil',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profil">
      <!-- Bileşen içeriği -->
    </div>
  `
})
export class ProfilComponent {
  // Bileşen mantığı
}
```

### 💉 Auth Injection ve Güvenlik
Auth Injection, kimlik doğrulama işlemlerini merkezi olarak yöneten bir sistemdir.

#### Özellikler:
- 🔐 Merkezi kimlik doğrulama
- 🎯 Otomatik token yönetimi
- 🛡️ Güvenli rota koruması

```typescript
// Auth Interceptor Örneği
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`)
      });
    }
    return next.handle(req);
  }
}
```

## 📦 Kurulum

```bash
# Projeyi klonlayın
git clone [proje-url]

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
ng serve
```

## 📁 Proje Yapısı

```
src/
├── app/
│   ├── models/        # Model dosyaları
│   ├── shared/        # Paylaşılan bileşenler
│   │   ├── services/  # HttpService, ErrorService vb.
│   │   └── components/# Ortak bileşenler
│   └── pages/         # Sayfa bileşenleri
└── assets/           # Statik dosyalar
```

## 🛠️ Geliştirme Komutları

```bash
# Geliştirme sunucusu
ng serve

# Üretim derlemesi
ng build --prod

# Testleri çalıştır
ng test

# Yeni bileşen oluştur
ng generate component yeni-bileşen
```

## 🔧 Kullanılan Teknolojiler

- ⚡️ Angular 17+
- 🎨 PrimeNG
- 🔄 RxJS
- 📝 TypeScript
- 🛠️ Angular CLI


## 📝 Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](LICENSE) dosyasını inceleyebilirsiniz.