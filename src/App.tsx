import Comment from 'src/components/Comment';
import WritableComment from 'src/components/WritableComment';
import { ProcessorProvider } from 'src/contexts/ProcessorContext';
import { calcTimeAgo } from 'src/utils/Date';

function App() {
  const comments = [
    {
      id: 0,
      created: new Date('2023-06-13T09:37:32.140Z'),
      content:
        '남산위에 저 소나무 철갑을 두른듯 바람서리 불변함은 우리기상 일세',
      writer: {
        avatar: undefined,
        name: '김철수',
      },
    },
    {
      id: 1,
      created: new Date('2023-07-12T09:37:32.140Z'),
      content:
        '동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리나라만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세',
      writer: {
        avatar: 'https://avatars.githubusercontent.com/u/40452288?s=40&v=4',
        name: '홍길동',
      },
    },
    {
      id: 2,
      created: new Date('2023-07-19T06:51:03.407Z'),
      content:
        '여름장이란 애시당초에 글러서, 해는 아직 중천에 있건만 장판은 벌써 쓸쓸하고 더운 햇발이 벌여놓은 전 휘장 밑으로 등줄기를 훅훅 볶는다. 마을 사람들은 거지 반 돌아간 뒤요, 팔리지 못한 나무꾼 패가 길거리에 궁싯거리고들 있으나 석유병이나 받고 고깃마리나 사면 족할 이 축들을 바라고 언제까지든지 버티고 있을 법은 없다.',
      writer: {
        avatar: undefined,
        name: '이아무개',
      },
    },
  ];
  return (
    <ProcessorProvider>
      {comments.map(({ id, created, content, writer }) => {
        return (
          <Comment
            key={id}
            writer={writer}
            comment={{ timeAgo: calcTimeAgo(created), content }}
            handleReply={() => console.log('reply on', id)}
          />
        );
      })}
      <WritableComment />
    </ProcessorProvider>
  );
}

export default App;
