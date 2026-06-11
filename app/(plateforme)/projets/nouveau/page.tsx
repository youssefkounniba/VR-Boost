/**
 * PAGE 2 du brief — Création de projet Home Staging.
 * À construire ensemble : étapes 1) informations du bien,
 * 2) lien Matterport / visite 3D, 3) style d'aménagement + préférences.
 */
export default function PageNouveauProjet() {
  return (
    <div>
      <h1 className="text-2xl font-extrabold">Nouveau projet</h1>
      <p className="mt-1 text-sm text-ardoise">
        Renseignez les informations du bien, ajoutez la visite 3D et choisissez
        un style d&apos;aménagement.
      </p>

      <div className="carte mt-6 p-8 text-center text-sm text-brume">
        Formulaire en 3 étapes — à développer (prochaine session de travail).
      </div>
    </div>
  );
}
