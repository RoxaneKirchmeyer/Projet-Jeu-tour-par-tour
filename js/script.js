const selectedClasses = [];

fetch('./json/classes.json')
    .then(response => response.json())
    .then(data => {
        const classesData = data;

        // création des deux joueurs
        const player1 = {
            nom: "Player 1",
            pointsDeVie: 40,
            attaque: null,
            estEnAttente: true,
            selectedClass: selectedClasses
        };

        const player2 = {
            nom: "Player 2",
            pointsDeVie: 40,
            attaque: null,
            estEnAttente: false,
            selectedClass: selectedClasses
        };

        // Récupération de l'element dans l'HTML
        const containerFight = document.getElementById('container-fight');

        // Création de la div pour le player 1 
        const player1Div = document.createElement('div');
        player1Div.id = 'player1';
        // Création du titre de player 1
        const player1Title = document.createElement('h2');

        // Création de la div des sorts de player1
        const player1Spells = document.createElement('div');
        player1Spells.id = 'player1-spells';

        player1Div.appendChild(player1Title);
        player1Div.appendChild(player1Spells);

        // Création du div pour le player 2
        const player2Div = document.createElement('div');
        player2Div.id = 'player2';
        // Création du titre de player 2
        const player2Title = document.createElement('h2');
        // Création de la div des sorts de player2
        const player2Spells = document.createElement('div');
        player2Spells.id = 'player2-spells';

        player2Div.appendChild(player2Title);
        player2Div.appendChild(player2Spells);

        // Ajout des divs des joueurs dans le container-fight
        containerFight.appendChild(player1Div);
        containerFight.appendChild(player2Div);

        // Création de la div résultat
        const resultatDiv = document.getElementById('resultat');

        // Création de la div de sélection des classes des personnages
        const selectionClasseDiv = document.createElement('div');
        selectionClasseDiv.id = 'selection-classe';
        const title = document.createElement('h2');
        title.textContent = 'Choisissez votre classe :';
        selectionClasseDiv.appendChild(title);


        // Création de l'overlay
        const overlay = document.createElement('div');
        overlay.classList.add('overlay');

        // fin création éléments HTML

        // création de la fonction pour sélectionner la classe
        function selectClasse(index) {
            let selectedClass = classesData.classes[index]
            // Sélectionne une classe spécifique à partir des données de classes disponibles
            // à l'index spécifié dans le tableau JSON
            // 'index' indique la position de la classe dans le tableau des classes
            // La classe sélectionnée est assignée à la variable 'selectedClass'

            // Création du bouton des classes et récupération des images du json
            // Parcourt chaque élément (classe) dans le tableau des classes et récupère son index
            classesData.classes.forEach((element, index) => {
                const classSelect = document.createElement('button');
                classSelect.className = "class-img " + element.name;
                classSelect.style.backgroundImage = `url(${element.profileImg})`
                // Ajoute une description de la classe en tant qu'attribut de données du bouton
                classSelect.setAttribute('data-description', element.description);


                // Ajout des evenements au survol pour afficher/masquer la carte de description des classes
                classSelect.addEventListener('mouseover', afficherDescription);
                classSelect.addEventListener('mouseout', cacherDescription);

                // Ajout d'un evenement au click 
                classSelect.addEventListener('click', () => {
                    // Stocker l'index de la classe choisie pour chaque joueur

                    // Si aucun joueur n'a choisi sa classe, le premier joueur choisi sa classe 
                    if (player1.classeIndex === undefined) {
                        // Si le joueur 1 n'a pas encore choisi de classe, assigne l'index de la classe actuelle à player1.classeIndex
                        player1.classeIndex = index;
                        // Stocke l'objet de la classe sélectionnée dans player1.selectedClass    
                        player1.selectedClass = selectedClass;
                    }
                    // Puis, le deuxième joueur choisi sa classe si le premier joueur a choisi sa classe
                    else if (player2.classeIndex === undefined) {
                        // Si le joueur 1 a déjà choisi une classe et que le joueur 2 n'en a pas encore choisi, assigne l'index de la classe actuelle à player2.classeIndex
                        player2.classeIndex = index;
                        // Stocke l'objet de la classe sélectionnée dans player2.selectedClass
                        player2.selectedClass = selectedClass;
                    }

                    // Vérifier si les deux joueurs ont choisi leur classes 
                    if (player1.classeIndex != undefined && player2.classeIndex != undefined) {
                        // Si la classe n'est pas undefined alors, assigne les classes sélectionnées aux joueurs à partir des données récupérées
                        player1.selectedClass = classesData.classes[player1.classeIndex];
                        player2.selectedClass = classesData.classes[player2.classeIndex];
                    }

                    // Si les classes sont selectionnées, alors ajoute les valeurs des classes dans le tableau selectedCLasses
                    if (player1.selectedClass && player2.selectedClass) {
                        // Ajoute les classes sélectionnées à selectedClasses
                        selectedClasses.push(player1.selectedClass, player2.selectedClass);
                    }

                    // Vérifie si player1 et player2 ont une classe sélectionnée et récupère le nom de la classe.
                    // Si player1 a une classe sélectionnée, selectedClassNamePlayer1 reçoit le nom de cette classe, sinon une chaîne vide.
                    const selectedClassNamePlayer1 = player1.selectedClass ? player1.selectedClass.name : '';
                    // Si player2 a une classe sélectionnée, selectedClassNamePlayer2 reçoit le nom de cette classe, sinon une chaîne vide.
                    const selectedClassNamePlayer2 = player2.selectedClass ? player2.selectedClass.name : '';

                    // Met à jour les titres des joueurs avec les noms des classes sélectionnées
                    player1Title.textContent = 'Joueur 1 : ' + selectedClassNamePlayer1;
                    player2Title.textContent = 'Joueur 2 : ' + selectedClassNamePlayer2;


                    // Vérifie si player1 a selectionné une classe. 
                    // Si player1 a choisi sa classe, selectedClassSpellPlayer1 reçoit les sorts de la classe selectionnée, sinon une chaîne vide.
                    const selectedClassSpellPlayer1 = player1.selectedClass ? player1.selectedClass.sorts : '';
                    // Crée des boutons pour chaque sort de player1 en utilisant la fonction createSpellButtons.
                    // Passes les sorts de player1, l'élément DOM player1Spells, la classe de bouton et le numéro du joueur pour identifier le joueur.
                    createSpellButtons(selectedClassSpellPlayer1, player1Spells, 'bouton-joueur1', 1);

                    // Vérifie si player2 a selectionné une classe.  
                    // Si player2 a choisi sa classe, selectedClassSpellPlayer2 reçoit les sorts de la classe selectionnée, sinon une chaîne vide.
                    const selectedClassSpellPlayer2 = player2.selectedClass ? player2.selectedClass.sorts : '';
                    createSpellButtons(selectedClassSpellPlayer2, player2Spells, 'bouton-joueur2', 2);
                    // Crée des boutons pour chaque sort de player2 en utilisant la fonction createSpellButtons.
                    // Passes les sorts de player2, l'élément DOM player2Spells, la classe de bouton et le numéro du joueur pour identifier le joueur.

                    // Affichez les classes sélectionnées dans la console
                    console.log("Classes sélectionnées :", selectedClasses);

                    // Masquer l'overlay
                    overlay.style.display = 'none';
                    // Masquer le titre
                    title.style.display = 'none';
                    // Masquer la div de selection des classes
                    selectionClasseDiv.style.display = 'none';
                }
                    // fin du if
                );
                // fin de l'écoute d'evenement

                selectionClasseDiv.appendChild(classSelect);


                // Fonction qui crée des boutons pour chaque sort dans une liste de sorts
                function createSpellButtons(spellList, container, className, joueur) {
                    // Parcours de chaque sort dans la liste
                    spellList.forEach((spell, index) => {
                        // Création d'un bouton pour chaque sort
                        const spellButton = document.createElement('button');
                        spellButton.className = className;
                        // Ajout du nom du sort au contenu textuel du bouton
                        spellButton.textContent = spell.spellName;
                        // Définit l'attribut de données personnalisé 'data-sort' de l'élément 'spellButton'
                        // ajoute une valeur correspondant à l'index de l'itération plus un.
                        spellButton.dataset.sort = index + 1;
                        spellButton.setAttribute('data-sorts-description', spell.description);

                        const spellImage = document.createElement('img');
                        spellImage.src = spell.spellImg;
                        // Ajoute une description de la classe en tant qu'attribut de données du bouton
                        spellButton.appendChild(spellImage); // Ajoutez l'image à votre bouton


                        spellButton.addEventListener('click', () => {
                            // Lorsque le bouton est cliqué, appelle la fonction choisirSort avec le numéro du sort extrait de l'attribut data-sort du bouton et l'objet joueur
                            choisirSort((spellButton.dataset.sort), joueur);
                        });

                        // Ajoute un écouteur d'événement "mouseover" au bouton spellButton
                        spellButton.addEventListener('mouseover', afficherDescriptionSpell);
                        // Ajoute un écouteur d'événement "mouseout" au bouton spellButton
                        spellButton.addEventListener('mouseout', cacherDescriptionSpell);

                        // Ajoute le bouton spellButton en tant qu'enfant à l'élément HTML référencé par la variable container
                        container.appendChild(spellButton);
                    });
                    // Fin du Foreach
                }
                // Fin de function createSpellButtons
            });
            // Fin du Foreach
            overlay.appendChild(selectionClasseDiv);
            document.body.appendChild(overlay);
        }
        // Fin selectClasse

        // Appeler la fonction pour afficher les options de classe au chargement de la page
        selectClasse();

        function afficherDescription(event) {
            // Récupère la description à afficher depuis l'attribut 'data-description' de l'élément déclencheur de l'événement
            const description = event.target.getAttribute('data-description');

            // Crée un élément div pour la tooltip et définit son contenu, style et position
            const tooltip = document.createElement('div');
            tooltip.textContent = description;
            tooltip.className = 'tooltip';

            tooltip.style.position = 'absolute';
            tooltip.style.padding = '10px';
            tooltip.style.background = '#f2f2f2';
            tooltip.style.border = '1px solid #ccc';
            tooltip.style.borderRadius = '5px';
            tooltip.style.zIndex = '9998';

            // Détermine la position de la tooltip par rapport à la position de l'élément déclencheur
            const rect = event.target.getBoundingClientRect();
            tooltip.style.top = rect.bottom + 'px';
            tooltip.style.left = rect.left + 'px';

            // Ajoute la tooltip au corps du document
            document.body.appendChild(tooltip);
            // Stocker la tooltip pour la cacher ensuite
            event.target.tooltip = tooltip;

        }

        function cacherDescription(event) {
            // Vérifie si la tooltip existe dans l'élément déclencheur et la supprime si c'est le cas
            if (event.target.tooltip) {
                event.target.tooltip.remove();
            }
        }


        function afficherDescriptionSpell(event) {
            // Récupère la description du sort depuis l'attribut 'data-sorts-description' de l'élément déclencheur de l'événement
            const descriptionSpell = event.target.getAttribute('data-sorts-description');

            // Crée un élément div pour la tooltip et définit son contenu, sa classe et ses styles
            const tooltip = document.createElement('div');
            tooltip.textContent = descriptionSpell;
            tooltip.className = 'tooltip';

            tooltip.style.position = 'absolute';
            tooltip.style.padding = '10px';
            tooltip.style.background = '#f2f2f2';
            tooltip.style.border = '1px solid #ccc';
            tooltip.style.borderRadius = '5px';
            tooltip.style.zIndex = '9999';

            // Définir la position de la tooltip par rapport au bouton de sort
            const rect = event.target.getBoundingClientRect();
            tooltip.style.top = rect.bottom + 'px'; // Position verticale sous le bouton
            tooltip.style.left = rect.left + 'px'; // Position horizontale alignée à gauche du bouton

            document.body.appendChild(tooltip);
            event.target.tooltip = tooltip;
        }

        function cacherDescriptionSpell(event) {
            if (event.target.tooltip) {
                event.target.tooltip.remove();
                event.target.tooltip = null;
            }
        }
        document.body.appendChild(selectionClasseDiv);

        // Debut du jeu

        function jouerTour(joueurActif, adversaire, degatsInfliges) {
            // Réduit les points de vie de l'adversaire par la quantité de dégâts infligés
            adversaire.pointsDeVie -= degatsInfliges;
            // Génère un message décrivant l'attaque et les dégâts infligés à l'adversaire
            let message = `${joueurActif.nom} attaque! ${adversaire.nom} perd ${degatsInfliges} points de vie. Points de vie restants : ${adversaire.pointsDeVie}`;
            // Affiche le message dans un élément HTML spécifié par la variable resultatDiv
            resultatDiv.textContent = message;
        }

        function afficherEtatDesJoueurs() {
            // Crée des chaînes de caractères décrivant l'état actuel des joueurs avec leur nom et leurs points de vie
            const joueur1 = `${player1.nom}: ${player1.pointsDeVie} points de vie`;
            const joueur2 = `${player2.nom}: ${player2.pointsDeVie} points de vie`;

            // Crée deux éléments <p> pour afficher les informations des joueurs
            const p1 = document.createElement("p");
            // Assigne la chaîne de caractères du joueur 1 au premier paragraphe
            p1.textContent = joueur1;
            const p2 = document.createElement("p");
            // Assigne la chaîne de caractères du joueur 2 au deuxieme paragraphe
            p2.textContent = joueur2;

            // Ajoute les éléments <p> contenant les informations des joueurs à l'élément HTML spécifié par resultatDiv
            resultatDiv.appendChild(p1);
            resultatDiv.appendChild(p2);
        }

        function choisirSort(sort, joueur) {
            // Détermine le joueur actif et l'adversaire en fonction du numéro de joueur passé en paramètre
            const joueurActif = joueur === 1 ? player1 : player2;
            const adversaire = joueur === 1 ? player2 : player1;

            // Vérifie si le joueur actif est en attente et si le jeu n'est pas terminé
            if (joueurActif.estEnAttente && !jeuTermine()) {

                // Récupère les dégâts du sort sélectionné par le joueur
                const degatsDuSort = joueurActif.selectedClass.sorts[sort - 1].damage;

                // Calcule les dégâts infligés à l'adversaire
                const degatsInfliges = joueurActif.attaque + degatsDuSort;
                console.log(degatsDuSort)
                // Effectue l'action du tour : attaque de joueurActif sur adversaire avec les dégâts spécifiés
                jouerTour(joueurActif, adversaire, degatsInfliges);
                // Met à jour l'affichage de l'état des joueurs après l'action
                afficherEtatDesJoueurs();
                // Met à jour les états d'attente des joueurs pour le tour suivant
                joueurActif.estEnAttente = false;
                adversaire.estEnAttente = true;
                // Vérifie si le jeu est terminé après cette action
                verifierFinDuJeu();

                // Désactiver les sorts du joueur actif
                desactiverSortsJoueur(joueur);

                // Active les sorts du prochain joueur si le jeu n'est pas terminé
                if (!jeuTermine()) {
                    activerSortsJoueur(joueur === 1 ? 2 : 1);
                }
            } else {
                // Affiche un message indiquant que le joueur doit attendre son tour s'il essaie d'agir hors de son tour
                let message = `Attendez votre tour, ${joueurActif.nom} !`;
                resultatDiv.textContent = message;
            }
        }

        function jeuTermine() {
            // Vérifie si les points de vie de l'un des joueurs (player1 ou player2) sont inférieurs ou égaux à zéro
            return player1.pointsDeVie <= 0 || player2.pointsDeVie <= 0;
        }


        function verifierFinDuJeu() {
            // Vérifie si le joueur 1 a perdu en vérifiant si ses points de vie sont inférieurs ou égaux à zéro
            if (player1.pointsDeVie <= 0) {
                // Si le joueur 1 a perdu, crée un message indiquant sa défaite
                let message = "Player 1 a perdu !";
                // Affiche le message de défaite dans l'élément HTML resultatDiv
                resultatDiv.textContent = message;
                // Désactive les sorts du joueur 1
                desactiverSortsJoueur(1);
                // Affiche le résultat final du jeu avec le message de défaite
                afficherResultatFinal(message);
                // Vérifie si le joueur 2 a perdu en vérifiant si ses points de vie sont inférieurs ou égaux à zéro
            } else if (player2.pointsDeVie <= 0) {
                // Si le joueur 2 a perdu, crée un message indiquant sa défaite
                let message = "Player 2 a perdu !";
                // Affiche le message de défaite dans l'élément HTML resultatDiv
                resultatDiv.textContent = message;
                // Désactive les sorts du joueur 2
                desactiverSortsJoueur(2);
                // Affiche le résultat final du jeu avec le message de défaite
                afficherResultatFinal(message);
            }
        }

        function afficherResultatFinal(message) {
            // Crée un nouvel élément <p> pour afficher le résultat final
            const resultatFinal = document.createElement("p");
            // Crée des chaînes de caractères indiquant les points de vie restants des deux joueurs
            const pvPlayer1 = `${player1.nom} : ${player1.pointsDeVie} points de vie`;
            const pvPlayer2 = `${player2.nom}: ${player2.pointsDeVie} points de vie.`;

            // Formate et assigne le contenu de l'élément <p> avec les informations sur les points de vie des joueurs
            resultatFinal.textContent = `Résultat final : ${pvPlayer1}, ${pvPlayer2}`;
            // Ajoute l'élément <p> contenant le résultat final à l'élément HTML spécifié par resultatDiv
            resultatDiv.appendChild(resultatFinal);
        }


        function desactiverSortsJoueur(joueur) {
            // Sélectionne tous les éléments de classe CSS correspondant aux boutons du joueur spécifié
            const sortsJoueur = document.querySelectorAll(`.bouton-joueur${joueur}`);
            // Pour chaque élément correspondant aux sorts du joueur
            sortsJoueur.forEach(sort => {
                // Désactive le bouton en le rendant non cliquable
                sort.disabled = true;
            });
        }

        function activerSortsJoueur(joueur) {
            // Sélectionne tous les éléments de classe CSS correspondant aux boutons du joueur spécifié
            const sortsJoueur = document.querySelectorAll(`.bouton-joueur${joueur}`);
            // Pour chaque élément correspondant aux sorts du joueur
            sortsJoueur.forEach(sort => {
                // Active le bouton en le rendant cliquable
                sort.disabled = false;
            });
        }

        afficherEtatDesJoueurs();

        // Sélectionne tous les éléments HTML qui ont la classe CSS '.bouton-joueur1' (boutons associés au joueur 1)
        const sortsJoueur1 = document.querySelectorAll('.bouton-joueur1');
        // Pour chaque élément correspondant aux boutons du joueur 1
        sortsJoueur1.forEach(sort => {
            // Ajoute un écouteur d'événements 'click' à chaque bouton
            sort.addEventListener('click', () => {
                // Lorsque le bouton est cliqué, appelle la fonction choisirSort avec le numéro du sort et le numéro du joueur (ici, 1)
                choisirSort((sort.dataset.sort), 1);
            });
        });

        // Sélectionne tous les éléments HTML qui ont la classe CSS '.bouton-joueur2' (boutons associés au joueur 2)
        const sortsJoueur2 = document.querySelectorAll('.bouton-joueur2');
        // Pour chaque élément correspondant aux boutons du joueur 2
        sortsJoueur2.forEach(sort => {
            // Ajoute un écouteur d'événements 'click' à chaque bouton
            sort.addEventListener('click', () => {
                // Lorsque le bouton est cliqué, appelle la fonction choisirSort avec le numéro du sort et le numéro du joueur (ici, 2)
                choisirSort((sort.dataset.sort), 2);
            });
        });

        // Sélectionne l'élément HTML ayant l'ID 'restartButton'
        const restartButton = document.getElementById('restartButton');
        // Ajout d'un gestionnaire d'événements 'click' au bouton de redémarrage
        restartButton.addEventListener('click', initialiserJeu);

        function initialiserJeu() {
            location.reload();
        }

    })

    .catch(error => {
        console.error('Erreur:', error);
    });
