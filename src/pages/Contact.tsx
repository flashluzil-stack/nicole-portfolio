import { useEffect, useState, type FormEvent } from 'react';
import { useDocumentMeta } from '../hooks/useDocumentMeta';
import { profile } from '../content/profile';
import { ArrowUpRight, Copy, LinkedIn, Mail } from '../components/Icons';

interface FormState {
  name: string;
  email: string;
  message: string;
}

const empty: FormState = { name: '', email: '', message: '' };

export default function Contact() {
  useDocumentMeta('Contact', profile.contactInvitation, '/contact');
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<FormState>>({});
  const [status, setStatus] = useState('');

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
    const next: Partial<FormState> = {};
    if (!form.name.trim()) next.name = 'Please enter your name.';
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (form.message.trim().length < 10) next.message = 'Please write a short message (at least 10 characters).';
    setErrors(next);
    if (Object.keys(next).length) {
      const firstKey = Object.keys(next)[0];
      document.getElementById(`contact-${firstKey}`)?.focus();
      return;
    }
    const subject = `Portfolio enquiry from ${form.name.trim()}`;
    const body = `${form.message.trim()}\n\n— ${form.name.trim()}\n${form.email.trim()}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setStatus('Your email app should now open with the message ready to send.');
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus('Email address copied to the clipboard.');
    } catch {
      setStatus(`Copy unavailable — the address is ${profile.email}.`);
    }
  };

  return (
    <section className="contact" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">
            <span className="eyebrow__index">03</span>Contact
          </p>
          <h1 id="contact-title" className="contact__title">
            Let’s <em>connect.</em>
          </h1>
          <p className="contact__lede">{profile.contactInvitation}</p>

          <ul className="contact__channels">
            <li>
              <span className="contact__label">Email</span>
              <a className="contact__channel" href={`mailto:${profile.email}`}>
                <Mail size={20} />
                <span>{profile.email}</span>
              </a>
              <button type="button" className="contact__copy" onClick={copyEmail}>
                <Copy size={15} /> Copy address
              </button>
            </li>
            <li>
              <span className="contact__label">Based in</span>
              <span className="contact__place">{profile.location}</span>
            </li>
            <li>
              <span className="contact__label">LinkedIn</span>
              <a className="contact__channel" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedIn size={20} />
                <span>Nicole Gofman on LinkedIn</span>
                <ArrowUpRight size={16} />
                <span className="visually-hidden">(opens in a new tab)</span>
              </a>
            </li>
          </ul>
        </div>

        <form className="contact-form" onSubmit={onSubmit} noValidate aria-labelledby="form-title">
          <h2 id="form-title" className="contact-form__title">
            Write a message
          </h2>
          <p className="contact-form__note">Sending opens your email app with the message ready to go.</p>
          {(['name', 'email', 'message'] as const).map((key) => {
            const label = key === 'name' ? 'Name' : key === 'email' ? 'Email' : 'Message';
            const err = errors[key];
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
            <span>Send message</span>
            <Mail size={16} />
          </button>
        </form>
      </div>
      <p className="visually-hidden" role="status" aria-live="polite">
        {status}
      </p>
      {status && (
        <p className="toast" aria-hidden>
          {status}
        </p>
      )}
    </section>
  );
}
