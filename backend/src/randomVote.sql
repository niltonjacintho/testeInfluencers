DROP function IF EXISTS randomvote;
CREATE  or replace function  randomVote(qtd integer) returns integer as 
$BODY$
BEGIN
	update influenciador 
	set votos = votos + 1 where influenciador.id in (select i.id from influenciador i inner join 
		(select round(100* random()) as id from generate_series(1, qtd) ) as re on i.id  = re.id); 
	return 0;
END;
$BODY$ LANGUAGE plpgsql;   



select randomVote(20);