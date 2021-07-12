import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons';
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';

function ProfileUser(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="Foto de perfil" style={{borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  const githubUser = 'ericknathan';
  const favouriteUsers = [
    'juunegreiros', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho', 'filipedeschamps'
  ];
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
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade ({favouriteUsers.length})</h2>
            <ul>
              {favouriteUsers.map((user) => {
                console.log(user);
                  return (
                    <li key={user}>
                      <a href={`/users/${user}`}>
                        <img src={`https://github.com/${user}.png`} alt={`Foto de perfil de ${user}`}/>
                        <span>{user}</span>
                      </a>
                    </li>
                  )
                })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  );
}
