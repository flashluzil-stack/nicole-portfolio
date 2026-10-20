import { useEffect, useState, type FormEvent } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { useI18n, Emph } from '../i18n';
import { ArrowUpRight, Copy, LinkedIn, Mail, Phone } from '../components/Icons';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const empty: FormState = { name: '', email: '', message: '' };

type FieldKey = keyof FormState;
/** Status messages are stored as keys and rendered in the current language. */
type StatusKey = '' | 'sent' | 'copied' | 'copyFailed';

export default function Contact() {
  const { t, c } = useI18n();
  const { profile } = c;
  useDocumentMeta(t.meta.contactTitle, profile.contactInvitation, '/contact');
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<FieldKey[]>([]);
  const [status, setStatus] = useState<StatusKey>('');
  const statusText =
    status === 'copyFailed' ? t.contact.status.copyFailed(profile.email) : status ? t.contact.status[status] : '';

  useEffect(() => {
    if (!status) return;
    const t = window.setTimeout(() => setStatus(''), 5000);
    return () => window.clearTimeout(t);
  }, [status]);

  const update = (key: keyof FormState) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  // The form composes an email in the visitor's own mail app — no third-party
  // service or backend is needed, and nothing is stored.
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const next: FieldKey[] = [];
    if (!form.name.trim()) next.push('name');
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.push('email');
    if (form.message.trim().length < 10) next.push('message');
    setErrors(next);
    if (next.length) {
      document.getElementById(`contact-${next[0]}`)?.focus();
      return;
    }
    const subject = t.contact.subject(form.name.trim());
    const body = `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('sent');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('copied');
    } catch {
      setStatus('copyFailed');
    }
  };

  return (
    <section className="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">
            <span className="eyebrow__index">03</span>
            {t.contact.eyebrow}
          </p>
          <h1 id="contact-title" className="contact__title">
            <Emph parts={t.contact.title} />
          </h1>
          <p className="contact__lede">{profile.contactInvitation}</p>

          <ul className="contact__channels">
            <li>
              <span className="contact__label">{t.contact.email}</span>
              <a className="contact__channel" href={`mailto:${profile.email}`}>
                <Mail size={20} />
                <span className="ltr">{profile.email}</span>
              </a>
              <button type="button" className="contact__copy" onClick={copyEmail}>
                <Copy size={15} /> {t.contact.copy}
              </button>
            </li>
            <li>
              <span className="contact__label">{t.contact.phone}</span>
              <a className="contact__channel" href={profile.phoneHref}>
                <Phone size={20} />
                <span className="ltr">{profile.phone}</span>
              </a>
            </li>
            <li>
              <span className="contact__label">{t.contact.basedIn}</span>
              <span className="contact__place">{profile.location}</span>
            </li>
            <li>
              <span className="contact__label">{t.contact.linkedinLabel}</span>
              <a className="contact__channel" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedIn size={20} />
                <span>{t.contact.linkedinText}</span>
                <ArrowUpRight size={16} />
                <span className="visually-hidden">{t.common.newTab}</span>
              </a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
          <h2 id="form-title" className="contact-form__title">
            {t.contact.formTitle}
          </h2>
          <p className="contact-form__note">{t.contact.formNote}</p>
          {(['name', 'email', 'message'] as const).map((key) => {
            const label = key === 'name' ? t.contact.name : key === 'email' ? t.contact.emailField : t.contact.message;
            const err = errors.includes(key) ? t.contact.errors[key] : '';
            const common = {
              id: `contact-${key}`,
              name: key,
              value: form[key],
              onChange: update(key),
              'aria-invalid': err ? true : undefined,
              'aria-describedby': err ? `contact-${key}-error` : undefined,
              required: true,
            };
            return (
              <div key={key} className={`field${err ? ' field--error' : ''}`}>
                <label htmlFor={`contact-${key}`}>{label}</label>
                {key === 'message' ? (
                  <textarea rows={6} {...common} />
                ) : (
                  <input
                    type={key === 'email' ? 'email' : 'text'}
                    dir={key === 'email' ? 'ltr' : undefined}
                    autoComplete={key === 'email' ? 'email' : 'name'}
                    {...common}
                  />
                )}
                {err && (
                  <p id={`contact-${key}-error`} className="field__error">
                    {err}
                  </p>
                )}
              </div>
            );
          })}
          <button type="submit" className="cta cta--solid contact-form__submit">
            <span>{t.contact.send}</span>
            <Mail size={16} />
          </button>
        </form>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {statusText}
      </p>
      {status && (
        <p className="toast" aria-hidden>
          {statusText}
        </p>
      )}
    </section>
  );
}
