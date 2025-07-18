type TPosition = {
  title: string;
  obligations: (string | JSX.Element)[];
  extraText?: string;
  requirements: string[];
  workHours?: string;
  offer: (string | JSX.Element)[];
  salary: JSX.Element;
  location: string;
  time: string;
  salaryType: string;
  googleFormLink: string;
  metaImageUrl: string;
};

type TPositionData = {
  germanTeacher: TPosition;
  englishTeacher: TPosition;
  chineseTeacher: TPosition;
  contentCreator: TPosition;
  administrator: TPosition;
};

export const positionData: TPositionData = {
  germanTeacher: {
    title: "გერმანულის მასწავლებელი",
    obligations: [
      "ონლაინ გაკვეთილების ჩატარება მოსწავლეებთან 18 წელს ზემოთ (1 გაკვეთილი 1 სთ 30 წთ, კვირაში სამუშაო დრო შეადგენს დაახლოებით 14-20 სთ-ს)",
      "გუნდის წევრებთან დროული კომუნიკაცია (მაგ: მოსწავლის გაცდენის თარიღების ადმინისტრატორისთვის მიწოდება) და იშვიათად რეპორტების წერა.",
      <>
        პერიოდულად გუნდთან ერთად ონლაინ და <strong>ცოცხალ</strong> შეკრებებზე
        დასწრება.
      </>,
      "პერიოდულად YouTube-ის ვიდეო გადაღებებში მონაწილეობა",
    ],
    extraText:
      "ჩვენთვის მრავალწლიანი გამოცდილება, რეზიუმეები, ხარისხი, დიპლომები, სერთიფიკატები და ა.შ. გადამწყვეტი არ არის.",
    requirements: [
      "იყოთ მინიმუმ 22 წლის და ასწავლოთ მინიმუმ 4-6 ჯგუფს/ინდივიდუალურ მოსწავლეს - ანუ კვირაში ჩვენთვის გამოყოთ ფიქსირებულად ჯამში 14-20 საათი, რომელსაც წინასწარ თავად ადგენთ და გვითანხმებთ  *ექვემდებარება მოლაპარაკებას.",
      "იყოთ ჩვენს გუნდში მინიმუმ 6 თვით (დაინტერესებულები ვართ მხოლოდ გრძელვადიანი თანამშრომლობით)",
      "გერმანულს ფლობდეთ C1 დონეზე და ქართული იყოს მშობლიური ენა",
      "ფლობდეთ ახსნისა და გადმოცემის უნარს",
      "იყოთ ენერგიული, ორგანიზებული, კომუნიკაბელური და პასუხისმგებლიანი ჩვენი გუნდის მიმართ (რაც ჩვენი გუნდის წევრისთვის აუცილებელია)",
      "გიყვარდეთ გერმანულის სწავლება (ამ საქმის სიყვარულის გარეშე შეუძლებელია)",
      "გქონდეთ ონლაინ სწავლების გამოცდილება და იყოთ ტექნიკასთან მეგობრული",
      "გიყვარდეთ კამერის ობიექტივში გამოჩენა(თუ გამოცდილება არ გაქვთ, ამაშიც ჩვენ დაგეხმარებით - მთავარია სურვილი)",
    ],
    offer: [
      "ამ პროფესიაში განვითარების დიიიდ პერსპექტივას",
      "თქვენზე მორგებულ გრაფიკს",
      "გამზადებულ სასწავლო ელექტრონულ მასალებს",
      "მოხერხებულ ნახევარგანაკვეთურ სამუშაოს",
      "საბონუსე სისტემას",
      <>
        ცოცხალ შეკრებებზე გასართობ აქტივობებს (ჩვენი გართობები{" "}
        <a
          className="underline text-lingo-green"
          href="https://shorturl.at/fkZIk"
          target="_blank"
        >
          იხილეთ აქ
        </a>
        )
      </>,
      "საინტერესო სიახლეებს",
      "ძაააალზე მხარდამჭერ და მეგობრულ გარემოს (ამას უბრალოდ არა, მართლა გპირდებით)",
      "წამახალისებელ საჩუქრებს (მაისური, ჭიქა, ჩანთა და ა.შ), რომლებსაც ჩვენი გუნდის ერთგულ წევრებს ტრადიციულად ვჩუქნით",
    ],
    salary: (
      <>
        ვაკანსიის საწყისი ეტაპი გულისხმობს სტაჟირებას ჯუნიორ მასწავლებლებისთვის,
        რომელიც მოიცავს 4-6 თვეს. ლიმიტის წარმატებულად დაფარვის შემდგომ ხდებით
        გუნდის მიდლ მასწავლებელი. ანაზღაურება - გამომუშავებით ჩატარებული
        გაკვეთილების შესაბამისად.
        <br />
        <br />
        ჯუნიორ მასწავლებლებისთვის ანაზღაურება შეადგენს{" "}
        <strong>
          თითო ინდივიდუალურ მოსწავლეზე თვეში 100 - 150 ლარს, თითო ჯგუფზე 140 -
          350 ლარს.
        </strong>{" "}
        ანაზღაურება განსხვავებულია მოსწავლეებისა და გაკვეთილების რაოდენობის
        მიხედვით.
        <br />
        <br />
        მიდლ მასწავლებლებისთვის ანაზღაურება შეადგენს{" "}
        <strong>
          თითო ინდივიდუალურ მოსწავლეზე თვეში 140 - 190 ლარს, თითო ჯგუფზე 180 -
          390 ლარს.
        </strong>
        <br />
        <br />
        თუკი კანდიდატი ფლობს გერმანულის სწავლების მინიმუმ 1 წლიან გამოცდილებას
        და შერჩევის სამივე ეტაპს უმაღლესი შედეგებით გაივლის, მისთვის სტაჟირების
        ხანგრძლივობა იქნება მხოლოდ 1 თვე.
      </>
    ),
    location: "თბილისი",
    time: "ნახევარი",
    salaryType: "კონკურენტული",
    googleFormLink: "https://forms.gle/ZfJecL1KtjVWrX117",
    metaImageUrl: "https://i.ibb.co/y5nVfrB/ger.png",
  },
  englishTeacher: {
    title: "ინგლისურის მასწავლებელი",
    obligations: [
      "ონლაინ გაკვეთილების ჩატარება მოსწავლეებთან 17 წელს ზემოთ (1 გაკვეთილი 1 სთ 30 წთ)",
      "გუნდის წევრებთან დროული კომუნიკაცია (მაგ: მოსწავლის გაცდენის თარიღების ადმინისტრატორისთვის მიწოდება) და იშვიათად რეპორტების წერა.",
      <>
        პერიოდულად გუნდთან ერთად ონლაინ და <strong>ცოცხალ</strong> შეკრებებზე
        დასწრება.
      </>,
      "პერიოდულად YouTube-ის ან/და მოკლე ვიდეო გადაღებებში მონაწილეობა - დაახლოებით 2 თვეში ერთხელ",
    ],
    extraText: "",
    requirements: [
      "იყოთ მინიმუმ 22 წლის.",
      "ინგლისურს ფლობდეთ C1 დონეზე და ქართული იყოს მშობლიური ენა",
      "ფლობდეთ ახსნისა და გადმოცემის უნარს",
      "იყოთ ენერგიული, ორგანიზებული, კომუნიკაბელური და პასუხისმგებლიანი ჩვენი გუნდის მიმართ (რაც ჩვენი გუნდის წევრისთვის აუცილებელია)",
      "გიყვარდეთ ინგლისურის სწავლება და პროფესიულად საკუთარ მომავალს ამ საქმიანობას უკავშირებდეთ (უპირატესობას მივანიჭებთ ამ პროფესიის კანდიდატებს)",
      "გქონდეთ ონლაინ სწავლების გამოცდილება და იყოთ ტექნიკასთან მეგობრული",
      "გიყვარდეთ კამერის ობიექტივში გამოჩენა",
      "ჩვენთან მუშაობის პერიოდში ასწავლოთ მხოლოდ ჩვენს მოსწავლეებს",
    ],
    offer: [
      "ამ პროფესიაში განვითარების დიიიდ პერსპექტივას",
      "გამზადებულ სასწავლო ელექტრონულ მასალებს",
      "ჯანმრთელობის დაზღვევის ძალიან ხელსაყრელ კორპორაციულ პაკეტს",
      <>
        ცოცხალ შეკრებებზე გასართობ აქტივობებს (ჩვენი გართობები:{" "}
        <a
          className="underline text-lingo-green"
          href="https://shorturl.at/fkZIk"
          target="_blank"
        >
          იხილეთ აქ
        </a>
        )
      </>,
      "საინტერესო სიახლეებს",
      "ძაააალზე მხარდამჭერ და მეგობრულ გარემოს (ამას უბრალოდ არა, მართლა გპირდებით)",
      "წამახალისებელ საჩუქრებს, რომლებსაც ჩვენი გუნდის ერთგულ წევრებს ტრადიციულად ვჩუქნით",
    ],
    salary: (
      <>
        სამუშაოს ტიპი - ჰიბრიდული (გაკვეთილების ჩატარება ონლაინ), ცოცხალი
        შეკრებები (გადაღებები და გასართობი შეხვედრები)
        <br />
        <br />
        ვაკანსიის საწყისი ეტაპი გულისხმობს გამოსაცდელ პერიოდს ჯუნიორ
        მასწავლებლებისთვის, მათთვის ვისაც გამოცდილება აკლიათ და ეს პერიოდი
        მოიცავს 6 თვეს. ლიმიტის წარმატებულად დაფარვის შემდგომ ხდებით გუნდის მიდლ
        მასწავლებელი.
        <br />
        <br />
        თუკი კანდიდატი ფლობს ინგლისურის სწავლების მინიმუმ 1 წლიან გამოცდილებას
        და შერჩევის სამივე ეტაპს უმაღლესი შედეგებით გაივლის, მისთვის ჯუნიორობის
        ხანგრძლივობა იქნება მხოლოდ 1-2 თვე იმისათვის, რომ ისწავლოს და გაეცნოს
        ჩვენი გაკვეთილების მოდელებს.
        <br />
        <br />
        <strong className="text-lingo-green">სამუშაოს გრაფიკი:</strong> სრული
        განაკვეთი: კვირაში 40 საათი. აქედან მინიმუმ 22 საათი უნდა იყოს საღამოს
        საათები 19:00 - 22:30. დანარჩენს თავად გვითანხმებთ
        <br />
        <br />
        დამამთავრებელი კურსის სტუდენტებისთვის ჯუნიორობის პერიოდში შესაძლებელია
        არასრულ(40 საათზე ნაკლებ) გრაფიკზე შეთანხმებაც. არადამამთავრებელი კურსის
        სტუდენტები ვაკანსიაზე არ განიხილებიან.
        <br />
        <br />
        ჯუნიორ მასწავლებლებისთვის ანაზღაურება შეადგენს თვეში 900-დან 1500
        ლარამდე.
        <br />
        <br />
        მიდლ მასწავლებლებისთვის ანაზღაურება შეადგენს თვეში 1700-დან 2500
        ლარამდე.
        <br />
        <br />
        ანაზღაურება დამოკიდებულია გაკვეთილებისა და მოსწავლეების რაოდენობაზე.
        <br />
        <br />
        კანდიდატებს, რომლებიც შერჩევის გარკვეულ კრიტერიუმებს ვერ
        დააკმაყოფილებენ, თუმცა აქვთ ამ სფეროში განვითარების პოტენციალი, Studio
        Lingo სთავაზობს არაანაზღაურებად სტაჟირებას Studio Lingo-ს მასწავლებლების
        გადასამზადებელ აკადემიაში. წარმატებული კურსდამთავრებულები კი
        დასაქმდებიან ჩვენს სკოლაში ჯუნიორ მასწავლებლებად.
      </>
    ),
    location: "თბილისი",
    time: "სრული",
    salaryType: "კონკურენტული",
    googleFormLink: "https://forms.gle/KnmQ195et7hcYwYa8",
    metaImageUrl: "https://i.ibb.co/DPsqp1VW/English-teacher.png",
  },
  chineseTeacher: {
    title: "ჩინურის მასწავლებელი",
    obligations: [
      "ონლაინ გაკვეთილების ჩატარება მოსწავლეებთან 18 წელს ზემოთ (1 გაკვეთილი 1 სთ 30 წთ, კვირაში სამუშაო დრო შეადგენს დაახლოებით 17-20 სთ)",
      "გუნდის წევრებთან დროული კომუნიკაცია (მაგ: მოსწავლის გაცდენის თარიღების ადმინისტრატორისთვის მიწოდება) და იშვიათად რეპორტების წერა.",
      <>
        პერიოდულად გუნდთან ერთად ონლაინ და <strong>ცოცხალ</strong> შეკრებებზე
        დასწრება.
      </>,
      "პერიოდულად YouTube-ის ვიდეო გადაღებებში მონაწილეობა",
    ],
    extraText:
      "ჩვენთვის მრავალწლიანი გამოცდილება, რეზიუმეები, ხარისხი, დიპლომები, სერთიფიკატები და ა.შ. გადამწყვეტი არ არის.",
    requirements: [
      "იყოთ მინიმუმ 22 წლის და ასწავლოთ მინიმუმ 5-6 ჯგუფს/ინდივიდუალურ მოსწავლეს - ანუ კვირაში ჩვენთვის გამოყოთ ფიქსირებულად ჯამში 17-20 საათი, რომელსაც წინასწარ თავად ადგენთ და გვითანხმებთ.",
      "იყოთ ჩვენს გუნდში მინიმუმ 6 თვით (დაინტერესებულები ვართ მხოლოდ გრძელვადიანი თანამშრომლობით)",
      "ჩინურს ფლობდეთ C1 დონეზე და ქართული იყოს მშობლიური ენა",
      "ფლობდეთ ახსნისა და გადმოცემის უნარს",
      "იყოთ ენერგიული, ორგანიზებული, კომუნიკაბელური და პასუხისმგებლიანი ჩვენი გუნდის მიმართ (რაც ჩვენი გუნდის წევრისთვის აუცილებელია)",
      "გიყვარდეთ ჩინურის სწავლება (ამ საქმის სიყვარულის გარეშე შეუძლებელია)",
      "გქონდეთ ონლაინ სწავლების გამოცდილება და იყოთ ტექნიკასთან მეგობრული",
      "გიყვარდეთ კამერის ობიექტივში გამოჩენა(თუ გამოცდილება არ გაქვთ, ამაშიც ჩვენ დაგეხმარებით - მთავარია სურვილი)",
    ],
    offer: [
      "ამ პროფესიაში განვითარების დიიიდ პერსპექტივას",
      "თქვენზე მორგებულ გრაფიკს",
      "გამზადებულ სასწავლო ელექტრონულ მასალებს",
      "მოხერხებულ ნახევარგანაკვეთურ სამუშაოს",
      "საბონუსე სისტემას",
      <>
        ცოცხალ შეკრებებზე გასართობ აქტივობებს (ჩვენი გართობები:{" "}
        <a
          className="underline text-lingo-green"
          href="https://shorturl.at/fkZIk"
          target="_blank"
        >
          იხილეთ აქ
        </a>
        )
      </>,
      "საინტერესო სიახლეებს",
      "ძაააალზე მხარდამჭერ და მეგობრულ გარემოს (ამას უბრალოდ არა, მართლა გპირდებით)",
      "წამახალისებელ საჩუქრებს (მაისური, ჭიქა, ჩანთა და ა.შ), რომლებსაც ჩვენი გუნდის ერთგულ წევრებს ტრადიციულად ვჩუქნით",
    ],
    salary: (
      <>
        ვაკანსიის საწყისი ეტაპი გულისხმობს სტაჟირებას ჯუნიორ მასწავლებლებისთვის,
        რომელიც მოიცავს 50 ჩასატარებელ გაკვეთილს - დაახლოებით 2-3 თვე. ლიმიტის
        წარმატებულად დაფარვის შემდგომ ხდებით გუნდის მიდლ მასწავლებელი.
        ანაზღაურება - გამომუშავებით ჩატარებული გაკვეთილების შესაბამისად.
        <br />
        <br />
        ჯუნიორ მასწავლებლებისთვის ანაზღაურება შეადგენს{" "}
        <strong>
          თითო ინდივიდუალურ მოსწავლეზე თვეში 130 - 200 ლარს, თითო ჯგუფზე 190 -
          450 ლარს.
        </strong>{" "}
        ანაზღაურება განსხვავებულია მოსწავლეებისა და გაკვეთილების რაოდენობის
        მიხედვით.
        <br />
        <br />
        მიდლ მასწავლებლებისთვის ანაზღაურება შეადგენს{" "}
        <strong>
          თითო ინდივიდუალურ მოსწავლეზე თვეში 170 - 240 ლარს, თითო ჯგუფზე 230 -
          490 ლარს.
        </strong>
        <br />
        <br />
        თუკი კანდიდატი ფლობს ჩინურის სწავლების მინიმუმ 1 წლიან გამოცდილებას და
        შერჩევის სამივე ეტაპს უმაღლესი შედეგებით გაივლის, მისთვის სტაჟირების
        ხანგრძლივობა იქნება მხოლოდ 1 თვე.
      </>
    ),
    location: "თბილისი",
    time: "ნახევარი",
    salaryType: "კონკურენტული",
    googleFormLink: "https://forms.gle/j91uKUvSba3VJ7DD6",
    metaImageUrl: "https://i.ibb.co/K9qNFxR/chi.png",
  },

  contentCreator: {
    title: "კონტენტ კრეატორი",
    obligations: [
      "კონტენტ იდეების გენერირება, მასალის შექმნა (მოკლე ვიდეოებისა და Youtube ვიდეოების დამუშავება) და განთავსება სოციალურ პლატფორმებზე (ვიდეოები, სთორები და პოსტები)",
      "Reels ვიდეო ტრენდების მარტივი ანალიტიკა სკოლის დამფუძნებელთან ერთად",
      "ფიზიკურად მონაწილეობის მიღება კონტენტის შექმნაში რეპორტიორთან ერთად ქუჩის ინტერვიუებზე (ვიდეოების გადაღება) თვეში ერთხელ ან ორჯერ.",
      <>
        პერიოდულად გუნდთან ერთად ონლაინ და <strong>ცოცხალ</strong> შეკრებებზე
        დასწრება.
      </>,
    ],
    extraText:
      "არ ვითხოვთ მრავალწლიან გამოცდილებას ამ სფეროში, ბევრ რამეს ჩვენ თავად გასწავლით. ჩვენთვის ყველაზე მნიშვნელოვანია პროფესიული განვითარების სურვილი, მონდომება და მინიმალური მოთხოვნების დაკმაყოფილება.",
    workHours:
      "სრული განაკვეთი , კვირაში 5 დღე ორშ-პარ (11:00-19:00 / 12:00-20:00) - კვირაში 4 დღე დისტანციური, კვირაში ერთი დღე ადგილზე მოსვლით (Stamba-ს სამუშაო სივრცე, რუსთაველის მეტროსთან)",
    requirements: [
      "ფლობდეთ გრაფიკული დიზაინის უნარებს საშუალო დონეზე (პლატფორმა Canva)",
      "ფლობდეთ Video editing-ს მინიმუმ საშუალო დონეზე (პროგრამა Capcut)",
      "გაინტერესებდეთ პლატფორმები, როგორებიცაა Tiktok, Facebook, Instagram, Youtube",
      "გქონდეთ განვითარებისა და გამოცდილების მიღების ძლიერი სურვილი",
      "ფლობდეთ ინგლისურს მინიმუმ B2 დონეზე",
      "იყოთ ორგანიზებული და დეტალებზე ორიენტირებული (რაც ამ პოზიციისთვის აუცილებელია)",
      "იყოთ პასუხისმგებლიანი მთლიანი გუნდის მიმართ (რაც ჩვენი გუნდის წევრისთვის აუცილებელია)",
      "იყოთ ჩვენს გუნდში მინიმუმ 6 თვით (დაინტერესებული ვართ მხოლოდ გრძელვადიანი თანამშრომლობით)",
    ],
    offer: [
      "ყოველთვიურ ხელფასს 1000 ლარის ოდენობით",
      "ამ სფეროში დიდ განვითარებას და უზარმაზარ გამოცდილებას",
      "არაიერარქიულ და მეგობრულ გარემოს (ამას უბრალოდ არა, მართლა გპირდებით)",
      "არჩევანს სამუშაო გრაფიკში (12:00-20:00 ან 11:00-19:00)",
      "პერიოდულად საბონუსე სისტემას ხარისხიანად შექმნილი კონტენტების შემთხვევაში",
      "პლატფორმა Canva-ს პრემიუმ პაკეტს (რომელიც კონტენტის შესაქმნელად დაგჭირდებათ)",
      "Iphone 13-ს (რომელიც კონტენტის შექმნასა და განთავსებას გაგიადვილებთ)",
      "Capcut-ში მაღალი დონის ხელსაწყოების სწავლებას (სასწავლო ვიდეოები და შესაძლებელია მასტერკლასზე დასწრებაც დაფინანსებით)",
      <>
        ცოცხალ შეკრებებზე გასართობ აქტივობებს (ჩვენი გართობები:{" "}
        <a
          className="underline text-lingo-green"
          href="https://shorturl.at/fkZIk"
          target="_blank"
        >
          იხილეთ აქ
        </a>
        )
      </>,
      "საინტერესო სიახლეებს",
      "წამახალისებელ საჩუქრებს (მაისური, ჭიქა, ჩანთა და ა.შ), რომლებსაც ჩვენი გუნდის ერთგულ წევრებს ტრადიციულად ვჩუქნით",
    ],
    salary: <></>,
    location: "თბილისი",
    time: "სრული",
    salaryType: "კონკურენტული",
    googleFormLink: "https://forms.gle/qTVPZUeTDtcwWjQj9",
    metaImageUrl: "https://i.ibb.co/QvFB3VJx/content-creator.png",
  },

  administrator: {
    title: "ადმინისტრატორი",
    obligations: [
      "მუშაობა ნახევარი განაკვეთით დისტანციურად - ორშაბათიდან პარასკევის ჩათვლით დილის/შუადღის/საღამოს საათები (შეთანხმებით)",
      "შაბათ-კვირას შემოსული ზარებისა და შეტყობინებების პასუხის გაცემა (არსებობის შემთხვევაში)",
    ],
    extraText:
      "არ ვითხოვთ თქვენგან გამოცდილებას და დიდ მიღწევებს ამ სფეროში, ჩვენთვის პროფესიული განვითარების სურვილი ყველაზე მნიშვნელოვანია.",
    requirements: [
      "იყოთ კომუნიკაბელური (ადამიანებთან ხშირი დაკონტაქტება, მათთვის სატელეფონო ზარებითა და წერილობითი ფორმით სასწავლო პირობების შესახებ ინფორმაციის მიწოდება, მოსწავლეების შეფასების მოსმენა და სხვა)",
      "იყოთ ორგანიზებული (მოსწავლეების გაცდენებისა და გადახდის თარიღების ჩანიშვნა, ფბ/ინსტაგრამ გვერდზე პასუხების გაცემა, მეილების გაგზავნა, პერიოდულად ვიდეო შეხვედრებზე დასწრება, მასწავლებლის გრაფიკის მიხედვით მოსწავლეების მათთან განაწილება)",
      "აიღოთ პასუხისმგებლობა მთლიანი გუნდის მიმართ (რაც ჩვენი გუნდის წევრისთვის აუცილებელია)",
      "იცოდეთ საოფისე პროგრამები: Gmail, Google Drive, Google Sheets, Google Forms",
    ],
    offer: [
      "მეგობრულ და მხარდამჭერ გუნდს (ამას უბრალოდ არა, მართლა გპირდებით)",
      "ინტენსიურ პრაქტიკას საზოგადოებასთან ურთიერთობაში",
      "თქვენზე მორგებულ გრაფიკს",
      "ფიქსირებულ ანაზღაურებას 400 ლარის ოდენობით",
      "სატელეფონო ნომერს ულიმიტო პაკეტით (დაგჭირდებათ ორბარათიანი ან ელექტრო სიმბარათიანი ტელეფონი)",
      <>
        ცოცხალ შეკრებებზე გასართობ აქტივობებს (ჩვენი გართობები:{" "}
        <a
          className="underline text-lingo-green"
          href="https://shorturl.at/fkZIk"
          target="_blank"
        >
          იხილეთ აქ
        </a>
        )
      </>,
      "საინტერესო სიახლეებს",
      "ძაააალზე მხარდამჭერ და მეგობრულ გარემოს (ამას უბრალოდ არა, მართლა გპირდებით)",
      "წამახალისებელ საჩუქრებს (მაისური, ჭიქა, ჩანთა და ა.შ), რომლებსაც ჩვენი გუნდის ერთგულ წევრებს ტრადიციულად ვჩუქნით",
    ],
    salary: <></>,
    location: "თბილისი",
    time: "ნახევარი",
    salaryType: "კონკურენტული",
    googleFormLink: "https://forms.gle/sNGvDbdSdDoi7oXA9",
    metaImageUrl: "https://i.ibb.co/8gSDB4wp/administrator.png",
  },
  // reporter: {
  //   title: "რეპორტიორი",
  //   obligations: [
  //     <>
  //       ქუჩის ინტერვიუების გადაღება (ქართველ და იშვიათად უცხოელ რესპოდენტებთან)
  //       კონტენტ შემქმნელთან ერთად - საწყის ეტაპზე კვირაში ერთხელ, შემდგომში -
  //       კვირაში 2-ჯერ. ვიდეოს ნიმუშს ნახავთ{" "}
  //       <a
  //         className="underline text-lingo-green"
  //         href="https://www.youtube.com/shorts/0RwvuRv4r2Y"
  //         target="_blank"
  //       >
  //         ამ ბმულზე
  //       </a>
  //     </>,
  //     "ინტერვიუს კითხვების მოფიქრება კონტენტ კრეატორთან ერთად უცხო ენების თემატიკაზე",
  //   ],
  //   extraText:
  //     "არ ვითხოვთ თქვენგან გამოცდილებას, განიხილება სრულიად დამწყები კანდიდატიც, რადგან ჩვენთვის პროფესიული განვითარებისა და ჩვენს გუნდში მოხვედრის სურვილი ყველაზე მნიშვნელოვანია.",
  //   requirements: [
  //     "იყოთ მინიმუმ 20 წლის კომუნიკაბელური, აქტიური, თამამი და მხიარული (ჩვენი რეპორტიორისთვის აუცილებელი თვისებები)",
  //     "გიყვარდეთ კამერის ობიექტივში გამოჩენა (თქვენს ვიდეოებს ათასობით ნახვები ექნება)",
  //     "გქონდეთ განვითარებისა და გამოცდილების მიღების ძლიერი სურვილი ამ სფეროში",
  //     "დარჩეთ ჩვენთან მინიმუმ 4 თვის განმავლობაში (დაინტერესებულნი ვართ მხოლოდ გრძელვადიანი თანამშრომლობით)",
  //     "ფლობდეთ ინგლისურს მინიმუმ საკომუნიკაციო დონეზე",
  //     "იყოთ ორგანიზებული და პასუხისმგებლიანი მთლიანი გუნდის მიმართ (რაც ჩვენი გუნდის წევრისთვის აუცილებელია)",
  //   ],
  //   offer: [
  //     "ანაზღაურებას თითო გასვლაზე 50 ლარის ოდენობით",
  //     "ამ სფეროში დიდ განვითარებას და უზარმაზარ გამოცდილებას",
  //     "ცნობადობას (თქვენს ვიდეოებს ბევრი ნახვები ექნება)",
  //     "მხარდამჭერ და მეგობრულ გარემოს (ამას უბრალოდ არა, მართლა გპირდებით)",
  //     "მოხერხებულ სამუშაო გრაფიკს (შეთანხმებით)",
  //     "საბონუსე სისტემას 200 ლარის ოდენობით წარმატებული ვიდეოების შემთხვევაში",
  //     "გადასაღებ აპარატურას (კამერა+მიკროფონი)",
  //     <>
  //       ცოცხალ შეკრებებზე გასართობ აქტივობებს (ჩვენი გართობები:{" "}
  //       <a
  //         className="underline text-lingo-green"
  //         href="https://shorturl.at/fkZIk"
  //         target="_blank"
  //       >
  //         იხილეთ აქ
  //       </a>
  //       )
  //     </>,
  //     "წამახალისებელ საჩუქრებს (მაისური, ჭიქა, ჩანთა და ა.შ), რომლებსაც ჩვენი გუნდის ერთგულ წევრებს ტრადიციულად ვჩუქნით",
  //   ],
  //   salary: <></>,
  //   location: "თბილისი",
  //   time: "კვირაში 3-6 სთ",
  //   salaryType: "კონკურენტული",
  //   googleFormLink:
  //     "https://docs.google.com/forms/d/e/1FAIpQLSc_lXpW0CyO1PwEIwUBg5NOTI4b-NdBk4vjMNlvonMiTbfqDA/viewform?pli=1",
  //   metaImageUrl: "https://i.ibb.co/NnnyN3W/reporter.png",
  // },
};
