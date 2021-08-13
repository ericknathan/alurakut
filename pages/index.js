import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import { useState, useEffect } from 'react';

function showMore(arr, redirect) {
  if(arr.length > 6) {
    return (
      <div className="show-more">
        <hr />
        <a href={redirect}>Ver todos</a>
      </div>
    )
  } else return null
}

function ProfileUser(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="Foto de perfil" style={{borderRadius: '8px'}}/>
      <hr />

      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {
  return (
    <ProfileRelationsBoxWrapper>
      { console.log(props.items) }
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
      <ul>
        {props.items.slice(0, 6).map((currentIndex) => {
            return (
              <li key={currentIndex.id}>
                <a href={`/user/${currentIndex.login}`}>
                  <img src={`https://github.com/${currentIndex.login}.png`} alt={`Foto do seguidor ${currentIndex.login}`}/>
                  <span>{currentIndex.login}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
      { showMore(props.items, `/followers`) }
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home() {
  const githubUser = 'ericknathan';

  const [communities, setCommunities] = useState([{
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    id: '118216264841521'
  }]);

  const favoriteUsers = [
    'juunegreiros', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho', 'filipedeschamps', 'guilhermesilveira'
  ];

  const [followers, setFollowers] = useState([]);
  useEffect(() => {
    fetch('https://api.github.com/users/ericknathan/followers')
    .then(serverResponse => {
      return serverResponse.json();
    })
    .then(completeResponse => {
      setFollowers(completeResponse);
    });

    fetch('https://graphql.datocms.com', {
      method: 'POST',
      headers: {
        'Authorization': 'c944a0a88a029af7f4744ee334641a',
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        query: `{ query {
          allCommunities {
            id
            title
            imageUrl
            creatorSlug
          }
        }}`
      })
    })
    .then(response => {
      return response.json();
    })
    .then(completeResponse => {
      const communities = completeResponse.data.data.allCommunities;
      console.log(completeResponse);
    });
  }, [followers]);

  function handleCreateCommunity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    setCommunities([...communities, {
      title: formData.get('title'),
      image: formData.get('image'),
      id: new Date().toString()
    }]);
  }

  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileUser githubUser={githubUser}/>
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem-vindo(a), {githubUser}</h1>
            <OrkutNostalgicIconSet/>
          </Box>
          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={handleCreateCommunity}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text"
                />
              </div>
              <div>
                <input
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="image"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="Seguidores" items={followers}/>
          <ProfileRelationsBoxWrapper>
          <h2 className="smallTitle">Comunidades ({communities.length})</h2>
            <ul>
              {communities.map((community) => {
                  return (
                    <li key={community.id}>
                      <a href={`/communities/${community.title}`}>
                        <img src={community.image} alt={`Foto da comunidade ${community.title}`}/>
                        <span>{community.title}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
            { showMore(communities, `/communities`) }
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({favoriteUsers.length})</h2>
            <ul>
              {favoriteUsers.slice(0, 6).map((user) => {
                  return (
                    <li key={user}>
                      <a href={`/user/${user}`}>
                        <img src={`https://github.com/${user}.png`} alt={`Foto de perfil de ${user}`}/>
                        <span>{user}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
            { showMore(favoriteUsers, `/friends`) }
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}
