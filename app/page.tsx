import Link from "next/link";
import { ArrowRight, Box, Users, Sofa } from "lucide-react";

/**
 * PAGE 1 du brief — Accueil / présentation de la solution.
 * Squelette structuré : hero, valeur par cible, comment ça marche, CTA.
 * À développer ensemble étape par étape.
 */
export default function PageAccueil() {
  return (
    <div className="mx-auto max-w-[1200px] px-6 py-6">
      {/* Barre de navigation */}
      <header className="panneau flex items-center justify-between px-6 py-3">
        <span className="text-2xl font-extrabold tracking-tight">
          VR<span className="font-normal">boost</span>
        </span>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-ardoise md:flex">
          <a href="#solution" className="hover:text-encre">La solution</a>
          <a href="#cibles" className="hover:text-encre">Pour qui</a>
          <a href="#process" className="hover:text-encre">Comment ça marche</a>
        </nav>
        <Link href="/dashboard" className="btn-noir">
          Accéder à la plateforme
        </Link>
      </header>

      {/* Hero */}
      <section id="solution" className="py-24 text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold leading-tight tracking-tight">
          Un bien vide devient une expérience immersive
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg text-ardoise">
          Home staging virtuel, visite 3D et accompagnement à distance via Hub
          &amp; Avatar — pour les enseignes de mobilier, agences immobilières
          et promoteurs.
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/projets/nouveau" className="btn-noir px-7 py-3">
            Créer un projet
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/projets" className="btn-blanc px-7 py-3">
            Voir une démo
          </Link>
        </div>
      </section>

      {/* Valeur par cible — à enrichir */}
      <section id="cibles" className="grid gap-5 md:grid-cols-3">
        {[
          {
            icone: Sofa,
            titre: "Enseignes de mobilier",
            texte:
              "Mettez vos collections en scène dans des biens réels et générez des intentions d'achat.",
          },
          {
            icone: Box,
            titre: "Agences immobilières",
            texte:
              "Vendez le potentiel d'un bien vide grâce à un staging virtuel premium et partageable.",
          },
          {
            icone: Users,
            titre: "Promoteurs",
            texte:
              "Faites visiter vos programmes avant livraison, à distance, accompagné d'un conseiller en avatar.",
          },
        ].map((c) => (
          <article key={c.titre} className="carte p-6">
            <c.icone className="h-7 w-7 text-accent" strokeWidth={1.6} />
            <h2 className="mt-4 text-lg font-extrabold">{c.titre}</h2>
            <p className="mt-2 text-sm leading-relaxed text-ardoise">
              {c.texte}
            </p>
          </article>
        ))}
      </section>

      {/* TODO étape suivante : section "Comment ça marche" en 3 étapes,
          aperçu visuel de la plateforme, pied de page. */}
      <footer id="process" className="py-16 text-center text-sm text-ardoise">
        VR Boost Agency — mini-MVP de démonstration
      </footer>
    </div>
  );
}
