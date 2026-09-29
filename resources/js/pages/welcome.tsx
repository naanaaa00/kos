import { useState } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import {
    BedDouble,
    CalendarCheck,
    Check,
    MapPin,
    MessageCircle,
    ShieldCheck,
    Sparkles,
    Wifi,
    Zap,
} from 'lucide-react';
import { dashboard, login, register } from '@/routes';

/**
 * Palet warna (ganti di sini kalau mau menyesuaikan brand):
 *  teal tua  #0B5D5B -> rasa aman & terpercaya (warna utama)
 *  mint      #E6F5F2 -> bersih, segar (latar section)
 *  kuning    #FFC531 -> hangat, menarik perhatian (khusus tombol & promo)
 *  tinta     #12302F -> teks utama
 */

const WHATSAPP = '6285785207606'; // TODO: ganti dengan nomor WA pengelola

interface KamarTersedia {
    id: number;
    no_kamar: string;
    tipe: string;
    harga: number;
    fasilitas: string;
}

const TIPE_KAMAR = [
    { value: 'ekonomi', label: 'Ekonomi' },
    { value: 'premium', label: 'Premium' },
    { value: 'vip', label: 'VIP' },
];

const formatRupiah = (harga: number) => `Rp ${harga.toLocaleString('id-ID')}`;

const waBookingUrl = (kamar: KamarTersedia) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(
        `Halo, saya mau booking Kamar ${kamar.no_kamar} (tipe ${TIPE_KAMAR.find((t) => t.value === kamar.tipe)?.label ?? kamar.tipe}) seharga ${formatRupiah(kamar.harga)}/bulan. Apakah masih tersedia?`,
    )}`;

const facilities = [
    { icon: Wifi, title: 'WiFi & listrik sudah termasuk', text: 'Satu harga tiap bulan. Tidak ada tagihan tambahan.' },
    { icon: ShieldCheck, title: 'Aman 24 jam', text: 'CCTV dan gerbang terkunci setiap malam.' },
    { icon: MapPin, title: 'Dekat kampus & kantor', text: 'Angkot, ojek online, dan minimarket ada di sekitar kos.' },
    { icon: Sparkles, title: 'Kamar rutin dibersihkan', text: 'Area bersama dibersihkan setiap hari.' },
];

const steps = [
    { icon: BedDouble, title: 'Pilih tipe kamar', text: 'Lihat kamar yang masih kosong dan harganya.' },
    { icon: CalendarCheck, title: 'Booking online', text: 'Pilih kamarmu, Chat pemilik, dan bayar DP.' },
    { icon: Zap, title: 'Pindah hari itu juga', text: 'Bawa barangmu. Kunci kamar sudah menunggu.' },
];

export default function Welcome() {
    const { auth } = usePage().props;
    const { kamarsByTipe } = usePage<{
        kamarsByTipe: Record<string, KamarTersedia[]>;
    }>().props;

    const [tipeAktif, setTipeAktif] = useState(TIPE_KAMAR[0].value);
    const [halaman, setHalaman] = useState(1);
    const kamarTersedia = kamarsByTipe[tipeAktif] ?? [];

    const KAMAR_PER_HALAMAN = 6;
    const totalHalaman = Math.max(1, Math.ceil(kamarTersedia.length / KAMAR_PER_HALAMAN));
    const halamanAman = Math.min(halaman, totalHalaman);
    const kamarDitampilkan = kamarTersedia.slice(
        (halamanAman - 1) * KAMAR_PER_HALAMAN,
        halamanAman * KAMAR_PER_HALAMAN,
    );

    const pilihTipe = (value: string) => {
        setTipeAktif(value);
        setHalaman(1);
    };

    return (
        <>
            <Head title="KosKita - Kos Nyaman Dekat Kampus & Kantor">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
            </Head>

            <div
                className="min-h-screen bg-white text-[#12302F] antialiased"
                style={{ fontFamily: "'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif" }}
            >
                {/* Strip promo */}
                

                {/* Navbar */}
                <header className="sticky top-0 z-20 border-b border-[#12302F]/10 bg-white/90 backdrop-blur">
                    <nav className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
                        <Link href="/" className="flex items-center gap-2 text-xl font-extrabold text-[#0B5D5B]">
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0B5D5B] text-white">
                                <BedDouble size={20} />
                            </span>
                            KosKita
                        </Link>

                        <div className="hidden items-center gap-7 text-sm font-medium md:flex">
                            <a href="#kamar" className="hover:text-[#0B5D5B]">Tipe kamar</a>
                            <a href="#fasilitas" className="hover:text-[#0B5D5B]">Fasilitas</a>
                            <a href="#cara-booking" className="hover:text-[#0B5D5B]">Cara booking</a>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            {auth.user ? (
                                <Link
                                    href={dashboard()}
                                    className="rounded-full bg-[#0B5D5B] px-5 py-2.5 font-semibold text-white hover:bg-[#094a48]"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={login()}
                                        className="rounded-full px-4 py-2.5 font-semibold hover:bg-[#E6F5F2]"
                                    >
                                        Masuk
                                    </Link>
                                    <Link
                                        href={register()}
                                        className="rounded-full bg-[#0B5D5B] px-5 py-2.5 font-semibold text-white hover:bg-[#094a48]"
                                    >
                                        Daftar
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </header>

                {/* Hero */}
                <section className="bg-[#E6F5F2]">
                    <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-2 lg:py-24">
                        <div>
                            <h1 className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl">
                                Kos bersih, aman, dan dekat ke mana-mana. Mulai 400 ribu.
                            </h1>
                            <p className="mt-5 max-w-lg text-lg leading-relaxed text-[#12302F]/75">
                                Listrik dan WiFi sudah termasuk. Cek kamar yang kosong, booking dari HP, lalu
                                pindah.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                <a
                                    href="#kamar"
                                    className="rounded-full bg-[#FFC531] px-8 py-4 text-base font-bold text-[#12302F] shadow-[0_6px_0_#d9a01a] transition active:translate-y-1 active:shadow-[0_2px_0_#d9a01a]"
                                >
                                    Booking kamar
                                </a>
                                <a
                                    href={`https://wa.me/${WHATSAPP}?text=Halo, saya mau tanya kamar kos yang masih kosong`}
                                    className="flex items-center gap-2 rounded-full border-2 border-[#0B5D5B] px-7 py-4 text-base font-bold text-[#0B5D5B] hover:bg-[#0B5D5B] hover:text-white"
                                >
                                    <MessageCircle size={20} />
                                    Tanya lewat WhatsApp
                                </a>
                            </div>

                            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium text-[#12302F]/80">
                                {['Tanpa biaya tersembunyi', 'Bayar bulanan', 'Bisa survei dulu'].map((t) => (
                                    <li key={t} className="flex items-center gap-1.5">
                                        <Check size={16} className="text-[#0B5D5B]" strokeWidth={3} />
                                        {t}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Kartu ketersediaan: fokus ke info yang dicari calon penghuni */}
                        <div className="relative mx-auto w-full max-w-md">
                            <div className="rounded-3xl bg-white p-6 shadow-[0_20px_60px_-20px_rgba(11,93,91,0.45)]">
                                <div className="flex items-center justify-between">
                                    <p className="font-bold">Ketersediaan hari ini</p>
                                    <span className="flex items-center gap-1.5 rounded-full bg-[#E6F5F2] px-3 py-1 text-xs font-bold text-[#0B5D5B]">
                                        <span className="h-2 w-2 rounded-full bg-[#1DB954]" />
                                        Ada kamar kosong
                                    </span>
                                </div>

                                <div className="mt-5 space-y-3">
                                    {TIPE_KAMAR.map((tipe) => {
                                        const kamarTipe =
                                            kamarsByTipe[tipe.value] ?? [];
                                        const termurah = kamarTipe.reduce(
                                            (min, k) =>
                                                k.harga < min ? k.harga : min,
                                            Infinity,
                                        );

                                        return (
                                            <div
                                                key={tipe.value}
                                                className="flex items-center justify-between rounded-2xl border border-[#12302F]/10 px-4 py-3"
                                            >
                                                <div>
                                                    <p className="font-semibold">
                                                        Kamar {tipe.label}
                                                    </p>
                                                    <p className="text-xs text-[#12302F]/60">
                                                        {kamarTipe.length > 0
                                                            ? `${kamarTipe.length} kamar tersedia`
                                                            : 'Belum ada'}
                                                    </p>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className="text-[10px] font-medium uppercase tracking-wide text-[#12302F]/50">
                                                        mulai
                                                    </span>
                                                    <p>
                                                        <span className="text-lg font-extrabold text-[#0B5D5B]">
                                                            {Number.isFinite(
                                                                termurah,
                                                            )
                                                                ? formatRupiah(
                                                                      termurah,
                                                                  )
                                                                : '-'}
                                                        </span>
                                                        <span className="text-xs text-[#12302F]/60">
                                                            {' '}
                                                            /bulan
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>

                                <p className="mt-4 text-center text-xs text-[#12302F]/60">
                                    Harga sudah termasuk listrik &amp; WiFi
                                </p>
                            </div>
                            <div className="absolute -bottom-4 -right-3 rotate-3 rounded-2xl bg-[#FFC531] px-4 py-2 text-sm font-extrabold shadow-lg">
                                Diskon 10%
                            </div>
                        </div>
                    </div>
                </section>

                {/* Tipe kamar */}
                <section id="kamar" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
                    <h2 className="text-3xl font-extrabold tracking-tight">Pilih kamar sesuai kebutuhanmu</h2>
                    <p className="mt-2 max-w-xl text-[#12302F]/70">
                        Semua tipe sudah termasuk listrik dan WiFi. Pilih tipe, lalu booking langsung lewat WhatsApp.
                    </p>

                    {/* Filter tipe */}
                    <div className="mt-8 flex flex-wrap gap-3" role="tablist" aria-label="Filter tipe kamar">
                        {TIPE_KAMAR.map((tipe) => {
                            const jumlah = (kamarsByTipe[tipe.value] ?? []).length;
                            const aktif = tipeAktif === tipe.value;
                            return (
                                <button
                                    key={tipe.value}
                                    type="button"
                                    role="tab"
                                    aria-selected={aktif}
                                    onClick={() => pilihTipe(tipe.value)}
                                    className={`rounded-full px-6 py-2.5 text-sm font-bold transition ${
                                        aktif
                                            ? 'bg-[#0B5D5B] text-white'
                                            : 'bg-[#E6F5F2] text-[#0B5D5B] hover:bg-[#d3ede8]'
                                    }`}
                                >
                                    {tipe.label} ({jumlah})
                                </button>
                            );
                        })}
                    </div>

                    {/* Daftar kamar tersedia untuk tipe terpilih */}
                    <div className="mt-8 grid gap-6 md:grid-cols-3">
                        {kamarDitampilkan.map((kamar) => (
                            <div
                                key={kamar.id}
                                className="flex flex-col rounded-3xl border border-[#12302F]/15 bg-white p-7"
                            >
                                <div className="flex items-start justify-between">
                                    <h3 className="text-xl font-bold">Kamar {kamar.no_kamar}</h3>
                                    <span className="rounded-full bg-[#E6F5F2] px-3 py-1 text-xs font-bold text-[#0B5D5B]">
                                        {TIPE_KAMAR.find((t) => t.value === kamar.tipe)?.label ?? kamar.tipe}
                                    </span>
                                </div>
                                <p className="mt-5">
                                    <span className="text-3xl font-extrabold text-[#0B5D5B]">
                                        {formatRupiah(kamar.harga)}
                                    </span>
                                    <span className="text-[#12302F]/60"> /bulan</span>
                                </p>
                                <p className="mt-4 flex-1 text-sm leading-relaxed text-[#12302F]/70">
                                    {kamar.fasilitas}
                                </p>
                                <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#1DB954]">
                                    <span className="h-2 w-2 rounded-full bg-[#1DB954]" />
                                    Masih tersedia
                                </span>
                                <a
                                    href={waBookingUrl(kamar)}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-6 flex items-center justify-center gap-2 rounded-full bg-[#FFC531] py-3 font-bold text-[#12302F] hover:bg-[#ffd15c]"
                                >
                                    <MessageCircle size={18} />
                                    Booking Kamar {kamar.no_kamar}
                                </a>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {totalHalaman > 1 && (
                        <nav
                            aria-label="Navigasi halaman kamar"
                            className="mt-10 flex items-center justify-center gap-2"
                        >
                            <button
                                type="button"
                                onClick={() => setHalaman(halamanAman - 1)}
                                disabled={halamanAman === 1}
                                className="rounded-full border border-[#12302F]/15 px-4 py-2 text-sm font-semibold text-[#0B5D5B] transition hover:bg-[#E6F5F2] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Sebelumnya
                            </button>
                            {Array.from({ length: totalHalaman }, (_, i) => i + 1).map((nomor) => (
                                <button
                                    key={nomor}
                                    type="button"
                                    aria-current={nomor === halamanAman ? 'page' : undefined}
                                    onClick={() => setHalaman(nomor)}
                                    className={`h-10 w-10 rounded-full text-sm font-bold transition ${
                                        nomor === halamanAman
                                            ? 'bg-[#0B5D5B] text-white'
                                            : 'bg-[#E6F5F2] text-[#0B5D5B] hover:bg-[#d3ede8]'
                                    }`}
                                >
                                    {nomor}
                                </button>
                            ))}
                            <button
                                type="button"
                                onClick={() => setHalaman(halamanAman + 1)}
                                disabled={halamanAman === totalHalaman}
                                className="rounded-full border border-[#12302F]/15 px-4 py-2 text-sm font-semibold text-[#0B5D5B] transition hover:bg-[#E6F5F2] disabled:cursor-not-allowed disabled:opacity-40"
                            >
                                Selanjutnya
                            </button>
                        </nav>
                    )}

                    {kamarTersedia.length === 0 && (
                        <div className="mt-8 rounded-3xl border-2 border-dashed border-[#12302F]/15 p-10 text-center">
                            <p className="font-semibold">Belum ada kamar {tipeAktif} yang tersedia.</p>
                            <p className="mt-1 text-sm text-[#12302F]/60">
                                Coba tipe lain, atau tanyakan jadwal kamar kosong lewat WhatsApp.
                            </p>
                            <a
                                href={`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Halo, saya mau tanya kapan ada kamar tipe ${TIPE_KAMAR.find((t) => t.value === tipeAktif)?.label} yang kosong`)}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#0B5D5B] px-6 py-3 text-sm font-bold text-white hover:bg-[#094a48]"
                            >
                                <MessageCircle size={18} />
                                Tanya lewat WhatsApp
                            </a>
                        </div>
                    )}
                </section>

                {/* Fasilitas */}
                <section id="fasilitas" className="scroll-mt-20 bg-[#E6F5F2] py-20">
                    <div className="mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-[1fr_1.4fr]">
                        <div>
                            <h2 className="text-3xl font-extrabold tracking-tight">
                                Yang kamu dapat setiap bulan
                            </h2>
                            <p className="mt-3 text-[#12302F]/70">
                                Kami urus kebersihan, keamanan, dan tagihan. Kamu tinggal fokus kuliah atau kerja.
                            </p>
                        </div>
                        <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2">
                            {facilities.map(({ icon: Icon, title, text }) => (
                                <div key={title} className="flex gap-4">
                                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0B5D5B] text-white">
                                        <Icon size={22} />
                                    </span>
                                    <div>
                                        <h3 className="font-bold">{title}</h3>
                                        <p className="mt-1 text-sm leading-relaxed text-[#12302F]/70">{text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Cara booking (urutan langkah, jadi pakai nomor) */}
                <section id="cara-booking" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-20">
                    <h2 className="text-3xl font-extrabold tracking-tight">Booking dalam 3 langkah</h2>
                    <ol className="mt-10 grid gap-6 md:grid-cols-3">
                        {steps.map(({ icon: Icon, title, text }, i) => (
                            <li key={title} className="flex gap-4 rounded-3xl border border-[#12302F]/15 p-6">
                                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#FFC531] font-extrabold">
                                    {i + 1}
                                </span>
                                <div>
                                    <h3 className="flex items-center gap-2 font-bold">
                                        {title}
                                        <Icon size={16} className="text-[#0B5D5B]" />
                                    </h3>
                                    <p className="mt-1 text-sm leading-relaxed text-[#12302F]/70">{text}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                </section>

                {/* CTA */}
                <section className="px-5 pb-20">
                    <div className="mx-auto max-w-6xl rounded-[2rem] bg-[#0B5D5B] px-8 py-14 text-center text-white">
                        <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight sm:text-4xl">
                            Kamar terbatas. Amankan milikmu sebelum penuh.
                        </h2>
                        <p className="mt-3 text-white/75">Diskon 10% untuk bulan pertama masih berlaku.</p>
                        <div className="mt-8 flex flex-wrap justify-center gap-3">
                            <Link
                                href={register()}
                                className="rounded-full bg-[#FFC531] px-8 py-4 font-bold text-[#12302F] hover:bg-[#ffd15c]"
                            >
                                Daftar &amp; booking sekarang
                            </Link>
                            <a
                                href={`https://wa.me/${WHATSAPP}`}
                                className="rounded-full border-2 border-white/40 px-8 py-4 font-bold hover:bg-white/10"
                            >
                                Jadwalkan survei
                            </a>
                        </div>
                    </div>
                </section>

                <footer className="border-t border-[#12302F]/10 py-8 text-center text-sm text-[#12302F]/60">
                    © {new Date().getFullYear()} KosKita. Kos nyaman dengan harga bersahabat.
                </footer>

                {/* Tombol WhatsApp melayang */}
                <a
                    href={`https://wa.me/${WHATSAPP}?text=Halo, saya mau tanya kamar kos yang masih kosong`}
                    aria-label="Chat WhatsApp"
                    className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg hover:scale-105"
                >
                    <MessageCircle size={26} />
                </a>
            </div>
        </>
    );
}