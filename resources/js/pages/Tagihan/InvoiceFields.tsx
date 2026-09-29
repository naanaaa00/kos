import { CurrencyInput, fieldClass, FormField } from '@/components/form-field';

export interface TagihanFormData {
    tanggal: string;
    jumlah: string;
    jatuh_tempo: string;
    status_tagihan: string;
    discount: string;
    denda: string;
}

interface InvoiceFieldsProps {
    data: TagihanFormData;
    /** Kirim satu field per perubahan; setData(key, value) tidak mengganti field lain. */
    onChange: (field: keyof TagihanFormData, value: string) => void;
    errors: Partial<Record<keyof TagihanFormData, string>>;
    total: number;
}

export function InvoiceFields({
    data,
    onChange,
    errors,
    total,
}: InvoiceFieldsProps) {
    return (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <FormField label="Status" error={errors.status_tagihan}>
                <select
                    value={data.status_tagihan}
                    onChange={(event) =>
                        onChange('status_tagihan', event.target.value)
                    }
                    className={fieldClass}
                >
                    <option value="belum_bayar">Belum Bayar</option>
                    <option value="lunas">Lunas</option>
                    <option value="lewat_tempo">Lewat Tempo</option>
                </select>
            </FormField>
            <FormField label="Tanggal Tagihan" error={errors.tanggal}>
                <input
                    type="date"
                    value={data.tanggal}
                    onChange={(event) =>
                        onChange('tanggal', event.target.value)
                    }
                    className={fieldClass}
                />
            </FormField>
            <FormField label="Jatuh Tempo" error={errors.jatuh_tempo}>
                <input
                    type="date"
                    value={data.jatuh_tempo}
                    onChange={(event) =>
                        onChange('jatuh_tempo', event.target.value)
                    }
                    className={fieldClass}
                />
            </FormField>
            <FormField label="Jumlah (Rp)" error={errors.jumlah}>
                <CurrencyInput value={total} readOnly />
            </FormField>
            <FormField label="Diskon (Rp)" error={errors.discount}>
                <CurrencyInput
                    value={data.discount}
                    onChange={(value) => onChange('discount', value)}
                />
            </FormField>
            <FormField label="Denda (Rp)" error={errors.denda}>
                <CurrencyInput
                    value={data.denda}
                    onChange={(value) => onChange('denda', value)}
                />
            </FormField>
        </div>
    );
}
