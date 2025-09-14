'use client'
import React, { useState } from 'react'
import SectionHeading from '@/components/admin/SectionHeading'

type StoreInfo = {
  name: string
  email: string
  phone: string
  address: string
  businessHours: string
}

type Appearance = {
  primaryColor: string
  homepageBanner: string // link hoặc path
}

type PaymentSettings = {
  cod: boolean
  bankTransfer: boolean
  stripe: boolean
  stripePublishableKey?: string
}

type ShippingSettings = {
  defaultMethod: string
  defaultFee: number
  freeShippingThreshold?: number
}

type SMTPSettings = {
  host: string
  port: number | ''
  username: string
  password: string
  fromEmail: string
}

type SEOSettings = {
  siteTitle: string
  metaDescription: string
}

type SocialLinks = {
  facebook?: string
  instagram?: string
  pinterest?: string
  youtube?: string
}

export default function AdminSettingsPage() {
  // store
  const [storeInfo, setStoreInfo] = useState<StoreInfo>({
    name: 'Nội Thất Demo',
    email: 'support@example.com',
    phone: '+84 912 345 678',
    address: '123 Đường ABC, Quận X, TP',
    businessHours: '9:00 - 18:00 (T2 - T7)'
  })

  // appearance
  const [appearance, setAppearance] = useState<Appearance>({
    primaryColor: '#0ea5e9', // tailwind sky-500
    homepageBanner: ''
  })

  // files: logo + favicon
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string | null>(null)
  const [faviconFile, setFaviconFile] = useState<File | null>(null)
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null)

  // payment
  const [payment, setPayment] = useState<PaymentSettings>({
    cod: true,
    bankTransfer: true,
    stripe: false,
    stripePublishableKey: ''
  })

  // shipping
  const [shipping, setShipping] = useState<ShippingSettings>({
    defaultMethod: 'standard',
    defaultFee: 30000,
    freeShippingThreshold: 1000000
  })

  // smtp
  const [smtp, setSmtp] = useState<SMTPSettings>({
    host: '',
    port: '',
    username: '',
    password: '',
    fromEmail: ''
  })

  // seo
  const [seo, setSeo] = useState<SEOSettings>({
    siteTitle: 'Nội Thất Cao Cấp',
    metaDescription: 'Cửa hàng bán đồ nội thất chất lượng cao'
  })

  // socials
  const [socials, setSocials] = useState<SocialLinks>({})

  // maintenance
  const [maintenanceMode, setMaintenanceMode] = useState<boolean>(false)

  // handle file selects
  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setLogoFile(f)
    setLogoPreview(URL.createObjectURL(f))
  }

  const handleFaviconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    setFaviconFile(f)
    setFaviconPreview(URL.createObjectURL(f))
  }

  // remove previews
  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview(null)
  }
  const removeFavicon = () => {
    setFaviconFile(null)
    setFaviconPreview(null)
  }

  // Save handler (demo)
  const handleSave = async () => {
    // ví dụ gửi FormData (nếu có file) lên backend
    const useFormData = logoFile || faviconFile
    if (useFormData) {
      const fd = new FormData()
      fd.append('storeInfo', JSON.stringify(storeInfo))
      fd.append('appearance', JSON.stringify(appearance))
      fd.append('payment', JSON.stringify(payment))
      fd.append('shipping', JSON.stringify(shipping))
      fd.append('smtp', JSON.stringify(smtp))
      fd.append('seo', JSON.stringify(seo))
      fd.append('socials', JSON.stringify(socials))
      fd.append('maintenanceMode', JSON.stringify(maintenanceMode))

      if (logoFile) fd.append('logo', logoFile)
      if (faviconFile) fd.append('favicon', faviconFile)

      // demo: log keys
      console.log('FormData keys:', Array.from(fd.keys()))
      // const res = await fetch('/api/admin/settings', { method: 'POST', body: fd })
      // ...
    } else {
      // nếu không file, gửi JSON
      const payload = {
        storeInfo,
        appearance,
        payment,
        shipping,
        smtp,
        seo,
        socials,
        maintenanceMode
      }
      console.log('Payload JSON:', payload)
      // const res = await fetch('/api/admin/settings', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      // ...
    }

    alert('Lưu settings (demo) — kiểm tra console để thấy payload.')
  }

  return (
    <div>
      <SectionHeading text="Settings" links={[{ href: '/admin/dashboard', label: 'Dashboard' }]} />

      <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column: general & appearance */}
        <div className="lg:col-span-2 space-y-6">
          {/* Store info */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Thông tin cửa hàng</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Tên cửa hàng</label>
                <input value={storeInfo.name} onChange={e => setStoreInfo(s => ({ ...s, name: e.target.value }))} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Email liên hệ</label>
                <input value={storeInfo.email} onChange={e => setStoreInfo(s => ({ ...s, email: e.target.value }))} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Số điện thoại</label>
                <input value={storeInfo.phone} onChange={e => setStoreInfo(s => ({ ...s, phone: e.target.value }))} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Giờ làm việc</label>
                <input value={storeInfo.businessHours} onChange={e => setStoreInfo(s => ({ ...s, businessHours: e.target.value }))} className="w-full border rounded px-3 py-2" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Địa chỉ</label>
                <input value={storeInfo.address} onChange={e => setStoreInfo(s => ({ ...s, address: e.target.value }))} className="w-full border rounded px-3 py-2" />
              </div>
            </div>
          </section>

          {/* Appearance / Logo */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Giao diện & Logo</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Màu chủ đạo</label>
                <input type="color" value={appearance.primaryColor} onChange={e => setAppearance(a => ({ ...a, primaryColor: e.target.value }))} className="w-20 h-10 p-0 border rounded" />
                <div className="text-sm mt-2">Preview: <span className="inline-block ml-2 px-2 py-1 rounded text-white" style={{ background: appearance.primaryColor }}>Aa</span></div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Banner trang chủ (link)</label>
                <input value={appearance.homepageBanner} onChange={e => setAppearance(a => ({ ...a, homepageBanner: e.target.value }))} className="w-full border rounded px-3 py-2" placeholder="https://..." />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Logo (PNG / SVG)</label>
                <input type="file" accept="image/*" onChange={handleLogoChange} className="block" />
                {logoPreview ? (
                  <div className="mt-3 relative inline-block">
                    <img src={logoPreview} alt="logo-preview" className="h-20 object-contain border rounded" />
                    <button type="button" onClick={removeLogo} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-gray-500">Chưa có logo</div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Favicon</label>
                <input type="file" accept="image/*" onChange={handleFaviconChange} className="block" />
                {faviconPreview ? (
                  <div className="mt-3 relative inline-block">
                    <img src={faviconPreview} alt="favicon-preview" className="h-10 w-10 object-contain border rounded" />
                    <button type="button" onClick={removeFavicon} className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
                  </div>
                ) : (
                  <div className="mt-3 text-sm text-gray-500">Chưa có favicon</div>
                )}
              </div>
            </div>
          </section>

          {/* SEO */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">SEO & Metadata</h3>
            <div className="grid grid-cols-1 gap-3">
              <div>
                <label className="block text-sm font-medium mb-1">Site title</label>
                <input value={seo.siteTitle} onChange={e => setSeo(s => ({ ...s, siteTitle: e.target.value }))} className="w-full border rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Meta description</label>
                <textarea value={seo.metaDescription} onChange={e => setSeo(s => ({ ...s, metaDescription: e.target.value }))} className="w-full border rounded px-3 py-2" rows={3} />
              </div>
            </div>
          </section>

          {/* Content / Legal (placeholder) */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Legal & Policies</h3>
            <p className="text-sm text-gray-600">Bạn có thể quản lý link tới Terms / Privacy / Return ở đây (có thể mở rich editor hoặc link tới pages quản lý riêng).</p>
          </section>
        </div>

        {/* Right column: payment, shipping, smtp, socials, maintenance */}
        <aside className="space-y-6">
          {/* Payment */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Payment</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={payment.cod} onChange={e => setPayment(p => ({ ...p, cod: e.target.checked }))} />
                <span>Thanh toán khi nhận hàng (COD)</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={payment.bankTransfer} onChange={e => setPayment(p => ({ ...p, bankTransfer: e.target.checked }))} />
                <span>Chuyển khoản ngân hàng</span>
              </label>
              <label className="flex items-center gap-3">
                <input type="checkbox" checked={payment.stripe} onChange={e => setPayment(p => ({ ...p, stripe: e.target.checked }))} />
                <span>Stripe / Thẻ</span>
              </label>
              {payment.stripe && (
                <input value={payment.stripePublishableKey} onChange={e => setPayment(p => ({ ...p, stripePublishableKey: e.target.value }))} className="w-full border rounded px-3 py-2 mt-2" placeholder="Stripe publishable key" />
              )}
            </div>
          </section>

          {/* Shipping */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Shipping</h3>
            <div className="space-y-2">
              <label className="block text-sm font-medium mb-1">Phương thức mặc định</label>
              <select value={shipping.defaultMethod} onChange={e => setShipping(s => ({ ...s, defaultMethod: e.target.value }))} className="w-full border rounded px-3 py-2">
                <option value="standard">Giao hàng tiêu chuẩn</option>
                <option value="express">Giao nhanh</option>
              </select>

              <label className="block text-sm font-medium mb-1">Phí mặc định (VNĐ)</label>
              <input type="number" value={shipping.defaultFee} onChange={e => setShipping(s => ({ ...s, defaultFee: Number(e.target.value) }))} className="w-full border rounded px-3 py-2" />

              <label className="block text-sm font-medium mb-1">Miễn phí ship từ (VNĐ)</label>
              <input type="number" value={shipping.freeShippingThreshold} onChange={e => setShipping(s => ({ ...s, freeShippingThreshold: Number(e.target.value) }))} className="w-full border rounded px-3 py-2" />
            </div>
          </section>

          {/* SMTP */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Email / SMTP</h3>
            <div className="space-y-2">
              <input value={smtp.host} onChange={e => setSmtp(s => ({ ...s, host: e.target.value }))} placeholder="SMTP host" className="w-full border rounded px-3 py-2" />
              <input value={String(smtp.port)} onChange={e => setSmtp(s => ({ ...s, port: Number(e.target.value) || '' }))} placeholder="Port" className="w-full border rounded px-3 py-2" />
              <input value={smtp.username} onChange={e => setSmtp(s => ({ ...s, username: e.target.value }))} placeholder="Username" className="w-full border rounded px-3 py-2" />
              <input value={smtp.password} onChange={e => setSmtp(s => ({ ...s, password: e.target.value }))} placeholder="Password" type="password" className="w-full border rounded px-3 py-2" />
              <input value={smtp.fromEmail} onChange={e => setSmtp(s => ({ ...s, fromEmail: e.target.value }))} placeholder="From email" className="w-full border rounded px-3 py-2" />
            </div>
          </section>

          {/* Socials */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Social Links</h3>
            <input value={socials.facebook || ''} onChange={e => setSocials(s => ({ ...s, facebook: e.target.value }))} placeholder="Facebook" className="w-full border rounded px-3 py-2 mb-2" />
            <input value={socials.instagram || ''} onChange={e => setSocials(s => ({ ...s, instagram: e.target.value }))} placeholder="Instagram" className="w-full border rounded px-3 py-2 mb-2" />
            <input value={socials.pinterest || ''} onChange={e => setSocials(s => ({ ...s, pinterest: e.target.value }))} placeholder="Pinterest" className="w-full border rounded px-3 py-2 mb-2" />
            <input value={socials.youtube || ''} onChange={e => setSocials(s => ({ ...s, youtube: e.target.value }))} placeholder="YouTube" className="w-full border rounded px-3 py-2" />
          </section>

          {/* Maintenance */}
          <section className="bg-white rounded shadow p-5">
            <h3 className="text-lg font-semibold mb-3">Maintenance</h3>
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="font-medium">Maintenance mode</div>
                <div className="text-sm text-gray-500">Bật để tạm dừng cửa hàng cho cập nhật.</div>
              </div>
              <label className="inline-flex items-center cursor-pointer">
                <input type="checkbox" checked={maintenanceMode} onChange={e => setMaintenanceMode(e.target.checked)} className="sr-only" />
                <div className={`w-11 h-6 rounded-full transition-colors ${maintenanceMode ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
              </label>
            </div>
          </section>

          <div className="sticky top-6">
            <button onClick={handleSave} className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Lưu thay đổi</button>
          </div>
        </aside>
      </div>
    </div>
  )
}