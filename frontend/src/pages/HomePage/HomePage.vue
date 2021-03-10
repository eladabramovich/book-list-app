<template>
  <main :class="`${styles.homePage} page`">
    <BaseContainer>
      <h2 :class="styles.categoryTitle">Newest 5 books on the website</h2>
      <hr :class="styles.divider" />
      <BooksList :books="books" />

      <h2 :class="styles.categoryTitle">Top 5 books on the website</h2>
      <hr :class="styles.divider" />
      <BooksList :books="books" />
    </BaseContainer>
  </main>
</template>

<script>
import homeStyles from './HomePage.module.css';

import BooksList from '@/components/Books/BooksList/BooksList.vue';
export default {
  components: {
    BooksList,
  },
  computed: {
    styles() {
      return homeStyles;
    },
  },
  data() {
    return {
      books: [
        {
          generes: ['Fantasy', 'Advanture'],
          averageScore: 0,
          _id: '5fbe5bf0e8e3c0134da2bb3f',
          images: {
            small: 'http://localhost:5000/images/Moby_Dick_96x132.jpg',
            large: 'http://localhost:5000/images/Moby_Dick_255x387.jpg',
          },
          title: 'Moby Dick',
          description:
            "Moby Dick is the story of Captain Ahab's quest to avenge the whale that 'reaped' his leg. The quest is an obsession and the novel is a diabolical study of how a man becomes a fanatic.\nBut it is also a hymn to democracy. Bent as the crew is on Ahab's appalling crusade, it is equally the image of a co-operative community at work: all hands dependent on all hands, each individual responsible for the security of each.\nAmong the crew is Ishmael, the novel's narrator, ordinary sailor, and extraordinary reader. Digressive, allusive, vulgar, transcendent, the story Ishmael tells is above all an education:",
          createdAt: '2020-11-25T13:28:16.919Z',
          updatedAt: '2020-11-25T13:28:16.919Z',
          __v: 0,
        },
        {
          generes: ['Fantasy', 'Advanture'],
          averageScore: 0,
          _id: '5fbe5c8b73a7c7157f26ae47',
          images: {
            small: 'http://localhost:5000/images/The_wizard_of_Oz_96x132.jpg',
            large: 'http://localhost:5000/images/The_wizard_of_Oz_255x387.jpg',
          },
          title: 'The wizard of Oz',
          description:
            'Follow the yellow brick road!\nDorothy thinks she is lost forever when a terrifying tornado crashes through Kansas and whisks her and her dog, Toto, far away to the magical land of Oz. To get home Dorothy must follow the yellow brick road to Emerald City and find the wonderfully mysterious Wizard of Oz. Together with her companions the Tin Woodman, the Scarecrow and the Cowardly Lion whom she meets on the way, Dorothy embarks on a strange and enchanting adventure.',
          createdAt: '2020-11-25T13:30:51.386Z',
          updatedAt: '2020-11-25T13:30:51.386Z',
          __v: 0,
        },
        {
          generes: ['Fantasy', 'Fiction'],
          averageScore: 0,
          _id: '5fbe5eaf65211a1a13607965',
          title: 'Good Omens',
          images: {
            small: 'http://localhost:5000/images/Good_Omens_96x132.jpg',
            large: 'http://localhost:5000/images/Good_Omens_255x387.jpg',
          },
          description:
            "What if, for once, the predictions are right, and the Apocalypse really is due to arrive next Saturday, just after tea?<br><br>It's a predicament that Aziraphale, a somewhat fussy angel, and Crowley, a fast-living demon, now find themselves in. They've been living amongst Earth's mortals since The Beginning and, truth be told, have grown rather fond of the lifestyle and, in all honesty, are not actually looking forward to the coming Apocalypse.<br><br>Now people have been predicting the end of the world almost from its very beginning, so it's only natural to be sceptical when a new date is set for Judgement Day.<br><br>You could spend the time left drowning your sorrows, giving away all your possessions in preparation for the rapture, or laughing it off as (hopefully) just another hoax. Or you could just try to do something about it.<br><br>And then there's the small matter that someone appears to have misplaced the Antichrist . . .",
          createdAt: '2020-11-25T13:39:59.298Z',
          updatedAt: '2020-11-25T13:39:59.298Z',
          __v: 0,
        },
        {
          generes: ['Fantasy', 'Fiction', 'Science Fiction', 'Humor'],
          averageScore: 0,
          _id: '5fbe5ecf65211a1a13607966',
          title: "The Hitchhiker's Guide to the Galaxy",
          images: {
            small:
              'http://localhost:5000/images/the_hitchhickers_guide_to_the_galaxy_96x132.jpg',
            large:
              'http://localhost:5000/images/the_hitchhickers_guide_to_the_galaxy_255x387.jpg',
          },
          description:
            "Seconds before Earth is demolished to make way for a galactic freeway, Arthur Dent is plucked off the planet by his friend Ford Prefect, a researcher for the revised edition of The Hitchhiker's Guide to the Galaxy who, for the last fifteen years, has been posing as an out-of-work actor. Together, this dynamic pair began a journey through space aided by a galaxyful of fellow travelers: Zaphod Beeblebrox--the two-headed, three-armed ex-hippie and totally out-to-lunch president of the galaxy; Trillian (formerly Tricia McMillan), Zaphod's girlfriend, whom Arthur tried to pick up at a cocktail party once upon a time zone; Marvin, a paranoid, brilliant, and chronically depressed robot; and Veet Voojagig, a former graduate student obsessed with the disappearance of all the ballpoint pens he's bought over the years. Where are these pens? Why are we born? Why do we die? For all the answers, stick your thumb to the stars!",
          createdAt: '2020-11-25T13:40:31.399Z',
          updatedAt: '2020-11-25T13:40:31.399Z',
          __v: 0,
        },
        {
          generes: ['Fantasy', 'Fiction', 'Science Fiction'],
          averageScore: 0,
          _id: '5fbe5ee165211a1a13607967',
          title: 'I Am Number Four',
          images: {
            small: 'http://localhost:5000/images/I_Am_Number_Four_96x132.jpg',
            large: 'http://localhost:5000/images/I_Am_Number_Four_255x387.jpg',
          },
          description:
            "John Smith is not your average teenager.\nHe regularly moves from small town to small town. He changes his name and identity. He does not put down roots. He cannot tell anyone who or what he really is. If he stops moving those who hunt him will find and kill him.\nBut you can't run forever.\nSo when he stops in Paradise, Ohio, John decides to try and settle down. To fit in. And for the first time he makes some real friends. People he cares about - and who care about him. Never in John's short life has there been space for friendship, or even love.\nBut it's just a matter of time before John's secret is revealed.\nHe was once one of nine. Three of them have been killed.\nJohn is Number Four. He knows that he is next . . .",
          createdAt: '2020-11-25T13:40:49.815Z',
          updatedAt: '2020-11-25T13:40:49.815Z',
          __v: 0,
        },
      ],
    };
  },
};
</script>
