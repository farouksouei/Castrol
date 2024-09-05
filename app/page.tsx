import { createClient } from "@/utils/supabase/server";
import CustomComponent from "@/components/castrol/CustomComponent";
import Header from "@/components/Header";
import Image from 'next/image';


export default async function Index() {
  const canInitSupabaseClient = () => {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
    try {
      createClient();
      return true;
    } catch (e) {
      return false;
    }
  };

  const isSupabaseConnected = canInitSupabaseClient();

  return (
      <div className="flex-1 w-full flex flex-col items-center">
          <nav className="justify-center ">
              <div className="w-full flex  items-center text-sm">
                  <Image src={"/assets/castrol.svg"} alt={"castrol"} width={200} height={200}/>
              </div>
          </nav>

          <div className="flex flex-col">
              <Header/>
          </div>
          <div>
              <CustomComponent
                  photo={"/assets/castrolEdge.svg"}
                  header={"CASTROL EDGE"}
                  paragraph={"Plus petits et ultra-puissants, les moteurs modernes sont à la pointe de la technologie et de l’ingénierie. Dans ces moteurs évolués, le lubrifiant est soumis à des pressions de plus en plus fortes, qui peuvent engendrer des frictions.\n" +
                      " \n" +
                      "Castrol EDGE avec Fluid TITANIUM transforme sa structure physique, se durcissant aux points d’extrême pression, pour réduire les contacts métal contre métal et les frictions. Quand la pression retombe, le lubrifiant reprend un écoulement fluide. Présentant une meilleure résistance à la pression, Castrol EDGE avec Fluid TITANIUM se transforme pour réduire de 20 % les frictions impactant la performance."}
                  advantages={
                      [
                          "Se transforme pour mieux résister lorsque la pression est maximale, assurant ainsi la protection de votre moteur",
                          "Réduit les frictions impactant la puissance pour les différentes vitesses et conditions du moteur",
                          "Performances démontrées lors de tests indépendants par rapport aux standards les plus rigoureux",
                          "Recommandé par des constructeurs automobiles de premier plan",
                          "Protège le moteur tout au long de l’intervalle de vidanges, même en cas d’extrême pression"
                      ]
                  }
                  footnote={"*En moyenne, arrondi à l’entier le plus proche. Par rapport au même lubrifiant sans Fluid TITANIUM. Nous avons testé des produits représentant 75 % de notre volume de ventes en 2017."}
              ></CustomComponent>
          </div>
          <div>
              <CustomComponent
                  photo={"/assets/castrolMagn.svg"}
                  header={"CASTROL MAGNATEC"}
                  paragraph={"La circulation s’est considérablement densifiée ces dix dernières années. Ce n’est pas seulement désagréable, cela endommage peu à peu votre moteur et ce, de façon permanente." +
                      " \n" +
                      "Face à l’urbanisation croissante, nous avons développé Castrol MAGNATEC doté de la technologie DUALOCK. La technologie DUALOCK MAGNATEC innovante de Castrol constitue une première mondiale. Les molécules adhèrent aux pièces critiques du moteur et se lient entre elles pour protéger le moteur contre l’usure liée à la montée en température et aux démarrages fréquents. Elles forment ainsi un film protecteur renforcé qui réduit de 50 %* l’usure liée à la montée en température et celle liée aux démarrages fréquents."}
                  footnote={"* Testé par rapport à la limite d’usure API SN du test Sequence IVA et à la limite d’usure ACEA du test OM646LA."}
              ></CustomComponent>
          </div>
          <div>
              <CustomComponent
                  photo={"/assets/gtx.svg"}
                  header={"CASTROL GTX"}
                  paragraph={"Castrol GTX contribue à prolonger la durée de vie du moteur depuis plus de 50 ans.  Depuis 1968, il a évolué pour répondre aux besoins des consommateurs et des constructeurs automobiles, et continue à innover pour rester une marque de confiance. Les conditions difficiles auxquelles votre moteur est exposé, comme la circulation dense, la mauvaise qualité du carburant, les conditions de conduite extrêmes et les intervalles trop longs entre les vidanges, peuvent provoquer la formation d’une épaisse substance similaire à de la boue, que l’on appelle « dépôt ». Les dépôts peuvent bloquer les circuits de lubrification vitaux de votre moteur, à l’instar du cholestérol. S’ils ne sont pas traités, ils peuvent réduire la puissance du moteur et, en fin de compte, sa durée de vie.La formule double action de Castrol GTX élimine les dépôts existants et prévient la formation de nouveaux dépôts, au-delà des standards rigoureux de l’industrie*."}
                  footnote={"* Par rapport aux limites fixées par le test API SN Sequence VG (test d’encrassage)"}
              ></CustomComponent>
          </div>
      </div>
  );
}
