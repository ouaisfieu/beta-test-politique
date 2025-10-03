/*
 * Script principal pour le test politique.
 *
 * Chaque question est associée à plusieurs dimensions : économie, société,
 * environnement et nationalisme. Les réponses vont de -2 (pas du tout
 * d'accord) à +2 (tout à fait d'accord). Des pondérations indiquent
 * comment chaque affirmation influence les axes.
 */

// Pondérations par question (index 0 = Q1, etc.)
const economicWeights =    [-1,  1, -1,  0,  0,  0,  1,  0, -1,  0,  0,  0, -1,  0,  1];
const socialWeights =      [ 0,  0,  0,  1, -1, -1,  0,  0,  0,  0, -1,  1,  0,  1,  0];
const environmentalWeights=[ 0,  0,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0, -1,  0,  0];
const nationalismWeights = [ 0,  0,  0,  1,  0,  0,  0,  0,  0, -1,  0,  1,  0,  0,  0];

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('quizForm');
  const resultsSection = document.getElementById('results');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    // Calcul des scores
    const values = [];
    for (let i = 1; i <= 15; i++) {
      const name = `q${i}`;
      const input = form.elements[name].value;
      values.push(parseInt(input, 10));
    }
    let econ = 0;
    let social = 0;
    let env = 0;
    let nat = 0;
    values.forEach((val, idx) => {
      econ   += val * economicWeights[idx];
      social += val * socialWeights[idx];
      env    += val * environmentalWeights[idx];
      nat    += val * nationalismWeights[idx];
    });
    // Classification
    const econClass = classifyEconomic(econ);
    const socialClass = classifySocial(social);
    const envClass = classifyEnvironmental(env);
    const natClass = classifyNationalism(nat);
    const crossClass = deriveCrossCategory({ econ, social, env, nat, econClass, socialClass, envClass, natClass });

    // Affichage des résultats
    resultsSection.innerHTML = '';
    const heading = document.createElement('h2');
    heading.textContent = 'Vos résultats';
    resultsSection.appendChild(heading);

    const pSummary = document.createElement('p');
    pSummary.innerHTML = `<strong>Catégorie principale :</strong> ${crossClass}`;
    resultsSection.appendChild(pSummary);

    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    ['Axe', 'Score', 'Interprétation'].forEach(text => {
      const th = document.createElement('th');
      th.textContent = text;
      headerRow.appendChild(th);
    });
    table.appendChild(headerRow);
    const addRow = (axis, score, interpretation) => {
      const tr = document.createElement('tr');
      const td1 = document.createElement('td'); td1.textContent = axis;
      const td2 = document.createElement('td'); td2.textContent = score.toString();
      const td3 = document.createElement('td'); td3.textContent = interpretation;
      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);
      table.appendChild(tr);
    };
    addRow('Économie', econ, econClass);
    addRow('Société', social, socialClass);
    addRow('Écologie', env, envClass);
    addRow('Nationalisme', nat, natClass);
    resultsSection.appendChild(table);

    const pNote = document.createElement('p');
    pNote.className = 'note';
    pNote.innerHTML = `Note : ce test n'a qu'une valeur indicative. Les orientations politiques réelles sont plus nuancées et dépendent du contexte culturel et historique.`;
    resultsSection.appendChild(pNote);

    resultsSection.hidden = false;
    resultsSection.scrollIntoView({ behavior: 'smooth' });
  });
});

// Fonctions de classification
function classifyEconomic(score) {
  if (score <= -10) return 'Extrême gauche (communiste)';
  if (score <= -6)  return 'Gauche (socialiste)';
  if (score <= -2)  return 'Centre gauche (social‑démocrate)';
  if (score <  2)   return 'Centre (modéré)';
  if (score <  6)   return 'Centre droit (libéral)';
  if (score < 10)   return 'Droite (conservatrice)';
  return 'Extrême droite (ultralibérale)';
}

function classifySocial(score) {
  if (score <= -8) return 'Libertaire / progressiste';
  if (score <= -4) return 'Plutôt progressiste';
  if (score < 4)   return 'Modéré';
  if (score < 8)   return 'Conservateur';
  return 'Autoritaire';
}

function classifyEnvironmental(score) {
  if (score <= -3) return 'Écologiste';
  if (score <= -1) return 'Plutôt écologiste';
  if (score < 1)   return 'Neutre';
  return 'Sceptique vis‑à‑vis de l’environnement';
}

function classifyNationalism(score) {
  if (score <= -4) return 'Mondialiste';
  if (score <= -2) return 'Plutôt mondialiste';
  if (score < 2)   return 'Neutre';
  if (score < 4)   return 'Nationaliste';
  return 'Nationaliste / populiste';
}

// Détermination d'une catégorie globale en croisant les axes
function deriveCrossCategory({ econ, social, env, nat, econClass, socialClass, envClass, natClass }) {
  // Catégorie verte prioritaire
  if ((envClass === 'Écologiste' || envClass === 'Plutôt écologiste') && econ <= -2) {
    return 'Écologiste / Vert';
  }
  // Libertaires à gauche ou à droite
  if (social <= -8) {
    return econ <= 0 ? 'Libertaire de gauche' : 'Libertaire de droite';
  }
  // Autoritaires à gauche ou à droite
  if (social >= 8) {
    return econ <= 0 ? 'Autoritaire de gauche' : 'Autoritaire de droite';
  }
  // Nationalisme prononcé
  if (nat >= 4) {
    if (econ >= 6) return 'Populiste de droite / nationaliste';
    if (econ <= -6) return 'Nationaliste de gauche';
    return 'Nationaliste';
  }
  // Économie comme base
  return econClass;
}