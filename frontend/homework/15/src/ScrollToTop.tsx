import { useRef } from 'react'

function ScrollToTop() {
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToTop = () => {
      if (containerRef.current) {
        containerRef.current.scrollTop = 0;
      }
    };
  
    return (
      <div ref={containerRef} style={{ height: '400px', overflowY: 'scroll' }}>
        {/* Your component content goes here */}
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
          tincidunt eros nec quam feugiat, vitae dignissim metus cursus. Duis id
          facilisis urna, in fermentum odio. Aliquam sit amet dapibus libero, non
          sollicitudin eros. Nunc suscipit erat vel sem venenatis, vel eleifend
          velit tincidunt. Maecenas vel felis nec purus malesuada placerat.
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Consequatur qui blanditiis esse voluptatibus doloribus saepe, tempora mollitia hic amet, nihil quisquam expedita sint excepturi rerum soluta dolore dolorum, beatae eius!
          Optio sint, quas eligendi nihil quo nam. Exercitationem sint sequi, totam minima voluptas odio nostrum earum eaque dolores vel ab quis reprehenderit! Quidem dignissimos illo ex saepe corporis. Rem, quo.
          Vel ea possimus, officiis eveniet quia porro animi hic, commodi eius praesentium quisquam accusantium blanditiis laboriosam sequi eaque ratione, beatae fugiat. Natus exercitationem deserunt corrupti iste libero eum maiores consectetur.
          Ipsam reprehenderit ea explicabo placeat commodi dolorum, maiores numquam nihil repellat est in id dolor dicta libero consequuntur accusamus assumenda, tempora error nulla saepe voluptas aliquam delectus quibusdam quas? Odio!
          Veritatis qui blanditiis, ex modi voluptate obcaecati, ea provident suscipit dicta minus consequuntur. Obcaecati distinctio eos dolore nemo, vero quo molestiae maxime libero magni incidunt dicta provident eligendi doloribus corrupti.
          Tempore, debitis nobis molestias voluptatum temporibus est exercitationem fugiat! Ullam fugiat error cumque voluptate illum odit nesciunt sint ipsam atque blanditiis, porro ipsa debitis minus tempore, aperiam alias asperiores quibusdam.
          Cupiditate ab aut quibusdam. Ex, quaerat ad odit ut impedit mollitia corrupti, explicabo odio culpa aliquam atque provident veritatis maxime! Voluptatem delectus doloribus placeat neque quia ea minus vitae aut.
          Necessitatibus possimus dolorem sequi non aliquam perferendis reprehenderit est mollitia dolores consequatur, nam unde quis velit, vel minus ullam delectus fugiat ut expedita illo. Aliquid itaque voluptates ducimus earum minus!
          Adipisci autem asperiores quia inventore eum beatae amet dolore illo. Ad, sed. Deleniti unde voluptas pariatur minus autem fuga eaque obcaecati alias dolorum, a maxime et rem sint iure nesciunt.
          Ipsa, iusto deserunt sequi quisquam repellendus maxime assumenda quo quod cumque asperiores autem culpa officiis! Consequuntur debitis fugiat alias. Impedit optio dignissimos vero! Qui aperiam quo quaerat enim accusamus quibusdam.
          Pariatur nostrum, repellendus recusandae deserunt eaque officia, minima magni suscipit eligendi modi ipsam iusto error eius, vitae quam maiores dolorum culpa porro aliquid! Quia, facere quod consequatur asperiores dolore dolores.
          Dolore esse impedit nihil repellendus voluptatibus eum, aspernatur quo necessitatibus, illo reiciendis sapiente. Itaque, voluptates iste aperiam ea impedit quasi esse, cumque, totam cupiditate suscipit autem corrupti asperiores dignissimos quos?
          Ea reprehenderit fugiat, tempora dolores commodi perspiciatis, corrupti qui eos adipisci quasi numquam architecto sed quod laboriosam? Aut, in veritatis! Modi vero corporis laudantium, aliquam exercitationem fugiat non magni rem?
          Magnam et fugit expedita modi at, culpa atque, ex dolores quas iusto explicabo doloribus laborum possimus aliquam, ullam perferendis. Sequi, perspiciatis corrupti ex delectus nihil amet harum facilis minima maxime.
          Voluptas, dolor! Ad quisquam qui pariatur odit veniam recusandae quae quam sapiente non sint temporibus ullam praesentium, consectetur mollitia ducimus perferendis, nesciunt eveniet, quidem cumque culpa dignissimos molestiae. Debitis, eos!
          Officia aperiam maiores rerum blanditiis facilis, enim architecto eligendi, obcaecati minima odit repellendus quibusdam et suscipit ex quasi eius pariatur tempore, cupiditate accusantium ullam aliquam iste tempora. Numquam, sunt dolorem.
          Id illo dolorum mollitia doloribus, eaque ad harum perferendis nesciunt quam minima qui debitis dicta reprehenderit consequatur perspiciatis ullam. Quos quas labore eos quaerat a voluptates debitis. Voluptas, magnam praesentium!
          Harum recusandae sit aliquid, quis, quae a doloremque voluptas eius deleniti error necessitatibus voluptatum facere, eligendi maxime quibusdam cupiditate in aut nesciunt! Quia debitis officia repellat praesentium, voluptate totam sit.
          Praesentium dolor ea dolorem unde quos delectus, optio quibusdam sunt beatae distinctio, itaque accusantium. Voluptatibus, eaque eius dolor eligendi, adipisci, impedit sapiente laborum debitis error ipsum magni itaque culpa animi!
          Consectetur dolorem velit itaque dolores, ut optio et eos quod doloremque amet commodi adipisci labore nihil cupiditate, nam, unde ipsum accusamus quas cumque ea corrupti ratione! Amet ea aliquam laboriosam?
          Nulla possimus ipsum, non provident quibusdam repudiandae, odit quos consequuntur exercitationem doloribus vitae ad cumque eveniet saepe aut sunt voluptatem fuga impedit delectus! Facilis aut eveniet nobis maxime, quidem veritatis.
          Blanditiis nesciunt, voluptas, autem nam quibusdam incidunt accusamus officiis porro debitis ipsa dolore repellendus magni iste tenetur cum! Repudiandae molestias nobis harum quae vero nam minima odio eaque accusantium perspiciatis.
          Labore exercitationem aut animi, quos, commodi, placeat ex recusandae unde ad quas minus eveniet. Quaerat, quisquam id! Odit, consequuntur nisi dignissimos dolore officiis illo aliquid mollitia ratione provident atque omnis?
          Ullam quidem totam ut est facilis hic consequatur dolorem voluptatibus, repellendus explicabo necessitatibus labore ex cupiditate in. Nisi autem cum veritatis itaque. Architecto quod eveniet eius, molestiae facere voluptatum sunt.
          Cumque assumenda illo fuga eius sunt dolor impedit incidunt! Dolore numquam officia nisi, facere dignissimos illo laudantium magnam officiis! Eos iusto aperiam dignissimos non, odio ipsam ipsum atque quod hic?
          Voluptate quos dolorum exercitationem dolorem cupiditate amet nemo numquam aliquam, cumque, dolores neque praesentium earum, quo blanditiis magnam ipsam alias laborum sed nostrum optio assumenda aliquid. Quo dolorem mollitia accusantium.
          Assumenda enim necessitatibus, ullam sunt voluptas commodi deserunt eveniet possimus laboriosam consectetur autem quo delectus ad, at mollitia vitae molestiae. Ex alias nisi hic laudantium vero culpa sunt dolores fugit!
          Necessitatibus repudiandae iste quisquam omnis, facilis quibusdam officia consequatur maxime modi provident soluta velit magni! Atque praesentium in repudiandae possimus, nihil deserunt asperiores eveniet debitis officia natus, unde, earum voluptas.
          Iste, quisquam sit. Sapiente reprehenderit quibusdam molestiae omnis in, ea animi mollitia fugiat eaque itaque nobis labore ipsa inventore modi nulla praesentium nostrum voluptates, atque nemo, quae quasi eligendi! Veniam.
          Quidem eos tempora odit, perferendis ipsa architecto itaque. Consequatur ipsam, iure eligendi facere, praesentium laborum, suscipit ex expedita nisi quia molestias esse nostrum aliquid fuga cum numquam porro corporis beatae!
          Excepturi veniam totam ducimus expedita molestias minus, debitis nisi necessitatibus laborum similique eum non pariatur qui natus! Ipsam deleniti reiciendis non officia veritatis cumque vitae? Facere alias delectus commodi ipsa.
          Ad ducimus architecto deleniti adipisci quae labore consequatur earum deserunt veniam ab sunt ipsam voluptatum consectetur, commodi iure nemo repudiandae repellendus! Esse placeat dicta tempore rem harum quia tempora possimus?
          Totam commodi exercitationem odio distinctio iure reprehenderit aliquid error eos odit atque. Praesentium minus, non aut, laudantium quod tempora harum atque temporibus inventore alias recusandae maiores dolorum sint ipsam natus.
          Necessitatibus corrupti ullam consequuntur? Eum enim at facilis commodi ab architecto vel, suscipit labore consequatur eius, eaque cum atque animi dolor sint dolorem dolorum incidunt quibusdam blanditiis dolores! Veniam, perspiciatis.
          Possimus beatae in repellendus voluptate, nobis explicabo, dolor officiis modi magnam qui, ipsum cum quis soluta officia vitae sed ex sapiente. In id quibusdam labore quasi, consequatur minima molestiae dicta.
          Omnis, dignissimos. Deleniti odio numquam minima, deserunt voluptates soluta ullam eius alias commodi ipsum aliquid reprehenderit maiores quasi enim exercitationem laboriosam molestiae ea natus tempora placeat fugiat. Laudantium, dolorem explicabo.
          Fuga alias eum sunt saepe error quasi facilis, consequuntur veniam facere laboriosam, accusamus quisquam recusandae? Dignissimos ullam eum iure ipsum eius voluptatem nisi! Nesciunt ea error magni voluptas illum! Perferendis?
          Facere neque impedit cum, obcaecati natus porro reiciendis laudantium minus harum ullam quasi nesciunt ad voluptates. Voluptatem quas tempora facere quod earum dolore repellendus praesentium magnam, aliquam, assumenda, voluptates dignissimos?
          Deserunt perspiciatis earum molestias perferendis exercitationem, magnam sunt accusamus ratione debitis eius non officia corrupti expedita iusto enim aspernatur ab fugiat numquam quaerat voluptatem libero! Omnis, aut! Ipsa, quas officiis.
          Autem delectus sequi debitis excepturi in hic error, temporibus ab blanditiis, repudiandae cum explicabo voluptates quae recusandae maxime numquam? Numquam quasi autem tempore illum adipisci aperiam reprehenderit perferendis saepe pariatur.
          Nemo explicabo id vero deserunt accusantium modi porro distinctio natus quisquam, sequi obcaecati iure, reiciendis tempore earum officia enim sint tenetur recusandae aut esse. Unde ex reiciendis aperiam debitis voluptas.
          Unde, blanditiis nesciunt, ut sint magni voluptates nobis velit laudantium minus voluptatem sapiente quibusdam ullam modi eum delectus, dolores doloribus quasi quos nostrum quidem quae cum numquam optio corporis. Asperiores?
          Consequatur beatae similique, animi, modi soluta asperiores molestias in ea rem ut ullam magni facilis perferendis tempora. Voluptate ipsum quia tempore, vitae quibusdam reprehenderit quis quae laboriosam nihil inventore at!
          Aliquam quibusdam nemo illum optio repellat, quod minima odit animi voluptatem a ea eum repudiandae at ipsam omnis delectus aut laboriosam ipsum quos sint quam. Nostrum delectus eius soluta corporis!
          Nam, illum iure ex magni voluptas eius laborum vitae pariatur quasi eum iusto sunt dolores nisi aliquam culpa voluptate quam optio? Pariatur, illum quasi. Soluta temporibus iure nesciunt quaerat blanditiis?
          Quasi provident facere veritatis dicta saepe voluptate, at voluptatibus est ipsam similique doloribus! Veritatis, iste? Magni, repudiandae veritatis, corporis sequi libero unde cumque optio animi vel possimus odit. Nobis, maxime!
          Ad autem tempora quibusdam doloribus, voluptatum eveniet nemo aut! Quis nemo tempora quam. Consequuntur facere, commodi quia asperiores similique amet deserunt earum, vitae exercitationem minima velit pariatur nemo, distinctio ex?
          Ullam, repellat iste a dignissimos sunt atque dolorum quod esse error magni fugiat ab quos sit quam nobis nihil beatae autem necessitatibus est rem debitis. Iste nesciunt rem reprehenderit voluptates.
          Aliquid reiciendis modi dolorum delectus ut repellendus id dolorem in iste dolores ad ipsum quae mollitia maiores, quo, labore quia exercitationem soluta molestiae voluptas? Expedita nihil distinctio officiis nobis laborum!
          Alias voluptatem iusto mollitia enim. Cumque sapiente repudiandae voluptatum error impedit, reiciendis ipsum quo atque ducimus possimus est aspernatur in fugit, ea ex inventore totam eaque placeat illo. Impedit, unde.
        </p>
  
        {/* Scroll to Top button */}
        <button onClick={scrollToTop}>Scroll to Top</button>
      </div>
    );
}

export default ScrollToTop