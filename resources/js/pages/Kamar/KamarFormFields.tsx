import { Home, Wifi } from 'lucide-react';
import { CurrencyInput, FormField, fieldClass } from '@/components/form-field';

export interface KamarFormData {
    no_kamar: string;
    tipe: string;
    harga: string;
    fasilitas: string;
    ketersediaan: boolean;
}

interface TipeOption {
    value: string;
    label: string;
}

interface KamarFormFieldsProps {
    data: KamarFormData;
    tipeOptions: TipeOption[];
    /** Kirim satu field per perubahan; setData(key, value) tidak mengganti field lain. */
    onChange: (field: keyof KamarFormData, value: string | boolean) => void;
    errors: Partial<Record<keyof KamarFormData, string>>;
}

export function KamarFormFields({
    data,
    tipeOptions,
    onChange,
    errors,
}: KamarFormFieldsProps) {
    return (
        <>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                <FormField label="Nomor Kamar" error={errors.no_kamar}>
                    <div className="relative">
                        <Home className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                        <input
                            id="no_kamar"
                            value={data.no_kamar}
                            onChange={(event) =>
                                onChange('no_kamar', event.target.value)
                            }
                            placeholder="cth. A-01"
                            className={`${fieldClass} pl-9`}
                        />
                    </div>
                </FormField>
                <FormField label="Tipe Kamar" error={errors.tipe}>
                    <select
                        id="tipe"
                        value={data.tipe}
                        onChange={(event) =>
                            onChange('tipe', event.target.value)
                        }
                        className={fieldClass}
                    >
                        {tipeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                </FormField>
                <FormField label="Harga per Bulan (Rp)" error={errors.harga}>
                    <CurrencyInput
                        value={data.harga}
                        onChange={(value) => onChange('harga', value)}
                    />
                </FormField>
            </div>
            <FormField label="Fasilitas" error={errors.fasilitas}>
                <div className="relative">
                    <Wifi className="pointer-events-none absolute top-3 left-3 h-4 w-4 text-neutral-400" />
                    <textarea
                        id="fasilitas"
                        rows={4}
                        value={data.fasilitas}
                        onChange={(event) =>
                            onChange('fasilitas', event.target.value)
                        }
                        placeholder="cth. Wi-Fi, kamar mandi dalam, lemari"
                        className={`${fieldClass} pl-9`}
                    />
                </div>
            </FormField>
            <label className="flex items-center gap-3 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                <input
                    type="checkbox"
                    checked={data.ketersediaan}
                    onChange={(event) =>
                        onChange('ketersediaan', event.target.checked)
                    }
                    className="h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
                />
                Kamar tersedia untuk disewa
            </label>
        </>
    );
}
